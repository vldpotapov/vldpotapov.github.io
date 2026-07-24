# Local Figma Frame Export

This is a fallback workflow when Figma MCP limits are reached.

## Start the local server

Open a terminal in the project folder:

```powershell
cd C:\Users\user\Documents\portfolio
```

Start the export server:

```powershell
npm.cmd run figma:export-server
```

Keep this terminal open while exporting from Figma.

## Import the Figma plugin

In Figma Desktop:

```text
Plugins -> Development -> Import plugin from manifest
```

Choose this file:

```text
C:\Users\user\Documents\portfolio\figma-export-plugin\manifest.json
```

After importing, the plugin will appear here:

```text
Plugins -> Development -> Portfolio Frame Export
```

## Export a selected frame

1. Keep the local export server running.
2. Select one frame, section, component, or group in Figma.
3. Run `Plugins -> Development -> Portfolio Frame Export`.
4. Click `Export Selected Frame`.

The exported file is saved here:

```text
design-sync/figma-export.json
```

When the design changes, select the updated frame and export again. The same JSON file will be overwritten, and Codex can read the latest local design data directly from the project.

