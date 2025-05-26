function h(o) { window.enmity.plugins.registerPlugin(o) }
function g(o) { return window.enmity.patcher.create(o) }
const t = window.enmity.modules.common.React;
const f = window.enmity.assets.getIDByName;
const P = t.Form, a = t.FormRow;

const r = {
  name: "DesktopSpoof",
  version: "1.0.0",
  description: "Spoofs Discord into thinking you're on a desktop client",
  authors: [{ name: "Oliver", id: "738291045672984576" }]
};

const I = g("DesktopSpoof");

const D = {
  ...r,
  onStart() {
    I.after("identify", window.enmity.modules.getByProps("identify"), (_, [data]) => {
      if (data?.properties) {
        data.properties.$os = "Windows";
        data.properties.$browser = "Discord";
        data.properties.$device = "Desktop";
      }
    });
  },
  onStop() {
    I.unpatchAll();
  },
  getSettingsPanel() {
    return t.createElement(
      P, { title: "Desktop Spoof" },
      t.createElement(a, {
        label: "Status",
        subLabel: "This plugin spoofs your client as desktop",
        leading: t.createElement(a.Icon, { source: f("ic_sync_24px") })
      })
    );
  }
};

h(D);
