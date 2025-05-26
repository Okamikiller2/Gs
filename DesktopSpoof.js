he({
  name: "DesktopSpoof",
  version: "1.0.0",
  description: "Spoofs Discord into thinking you're on a desktop client",
  authors: [{ name: "YourName", id: "YourDiscordID" }],
  onStart() {
    I.after("identify", window.enmity.modules.getByProps("identify"), (_, [data]) => {
      if (data?.properties) {
        data.properties.$os = "Windows"; // or "macOS"
        data.properties.$browser = "Discord";
        data.properties.$device = "Desktop";
      }
    });
  },
  onStop() {
    I.unpatchAll();
  },
  SettingsPanel() {
    return o(P, { title: "Desktop Spoof" },
      o(a, {
        label: "Status",
        subLabel: "This plugin spoofs your client as desktop",
        leading: o(a.Icon, { source: f("ic_sync_24px") })
      })
    );
  }
});
