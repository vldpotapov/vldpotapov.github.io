figma.showUI(__html__, { width: 360, height: 190 });

const serverUrl = "http://localhost:8787/figma-export";

const isMixed = (value) => value === figma.mixed;

const round = (value) => {
  if (typeof value !== "number") return value;
  return Math.round(value * 1000) / 1000;
};

const colorToHex = (color, opacity = 1) => {
  const to255 = (value) => Math.round(value * 255).toString(16).padStart(2, "0");
  const alpha = opacity < 1 ? Math.round(opacity * 255).toString(16).padStart(2, "0") : "";

  return `#${to255(color.r)}${to255(color.g)}${to255(color.b)}${alpha}`.toUpperCase();
};

const serializePaints = (paints) => {
  if (!Array.isArray(paints) || isMixed(paints)) return [];

  return paints
    .filter((paint) => paint.visible !== false)
    .map((paint) => {
      if (paint.type === "SOLID") {
        return {
          type: paint.type,
          color: colorToHex(paint.color, paint.opacity ?? 1),
          opacity: paint.opacity ?? 1,
        };
      }

      return {
        type: paint.type,
        opacity: paint.opacity ?? 1,
        scaleMode: paint.scaleMode,
        imageHash: paint.imageHash,
      };
    });
};

const serializeEffects = (effects) => {
  if (!Array.isArray(effects) || isMixed(effects)) return [];

  return effects
    .filter((effect) => effect.visible !== false)
    .map((effect) => ({
      type: effect.type,
      color: effect.color ? colorToHex(effect.color, effect.color.a ?? 1) : undefined,
      offset: effect.offset ? { x: round(effect.offset.x), y: round(effect.offset.y) } : undefined,
      radius: round(effect.radius),
      spread: round(effect.spread),
    }));
};

const serializeAutoLayout = (node) => {
  if (!("layoutMode" in node) || node.layoutMode === "NONE") return null;

  return {
    layoutMode: node.layoutMode,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
    counterAxisSizingMode: node.counterAxisSizingMode,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    itemSpacing: round(node.itemSpacing),
    paddingTop: round(node.paddingTop),
    paddingRight: round(node.paddingRight),
    paddingBottom: round(node.paddingBottom),
    paddingLeft: round(node.paddingLeft),
  };
};

const serializeText = (node) => {
  if (node.type !== "TEXT") return null;

  return {
    characters: node.characters,
    fontSize: isMixed(node.fontSize) ? "mixed" : node.fontSize,
    fontName: isMixed(node.fontName) ? "mixed" : node.fontName,
    fontWeight: isMixed(node.fontWeight) ? "mixed" : node.fontWeight,
    lineHeight: isMixed(node.lineHeight) ? "mixed" : node.lineHeight,
    letterSpacing: isMixed(node.letterSpacing) ? "mixed" : node.letterSpacing,
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical,
    textCase: isMixed(node.textCase) ? "mixed" : node.textCase,
    textDecoration: isMixed(node.textDecoration) ? "mixed" : node.textDecoration,
  };
};

const serializeNode = (node) => {
  const box = node.absoluteBoundingBox;

  return {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible,
    locked: node.locked,
    position: box
      ? {
          x: round(box.x),
          y: round(box.y),
          width: round(box.width),
          height: round(box.height),
        }
      : null,
    opacity: "opacity" in node ? round(node.opacity) : undefined,
    blendMode: "blendMode" in node ? node.blendMode : undefined,
    fills: "fills" in node ? serializePaints(node.fills) : [],
    strokes: "strokes" in node ? serializePaints(node.strokes) : [],
    strokeWeight: "strokeWeight" in node && !isMixed(node.strokeWeight) ? round(node.strokeWeight) : undefined,
    cornerRadius: "cornerRadius" in node && !isMixed(node.cornerRadius) ? round(node.cornerRadius) : undefined,
    effects: "effects" in node ? serializeEffects(node.effects) : [],
    autoLayout: serializeAutoLayout(node),
    constraints: "constraints" in node ? node.constraints : undefined,
    text: serializeText(node),
    children: "children" in node ? node.children.map(serializeNode) : [],
  };
};

const selectionSummary = () =>
  figma.currentPage.selection.map((node) => ({
    id: node.id,
    name: node.name,
    type: node.type,
  }));

figma.ui.onmessage = async (message) => {
  if (message.type !== "export-selection") return;

  const [selected] = figma.currentPage.selection;

  if (!selected) {
    figma.ui.postMessage({ text: "Nothing selected. Select one frame first." });
    return;
  }

  if (figma.currentPage.selection.length > 1) {
    figma.ui.postMessage({ text: "Please select only one frame or group." });
    return;
  }

  try {
    const payload = {
      source: "figma-selection-export",
      exportedAt: new Date().toISOString(),
      fileName: figma.root.name,
      pageName: figma.currentPage.name,
      selection: selectionSummary(),
      frame: serializeNode(selected),
    };

    const response = await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || "Export failed.");
    }

    figma.ui.postMessage({ text: `Saved: ${result.file}` });
  } catch (error) {
    figma.ui.postMessage({
      text: `Could not save. Start the local server first. ${error.message}`,
    });
  }
};
