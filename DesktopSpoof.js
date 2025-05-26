const manifest = {
  name: "desktop-spoof",
  version: "1.0.0",
  description: "Spoofs Discord into thinking you're using a desktop client (Windows/macOS).",
  authors: [{ name: "yourname", id: "000000000000000000" }],
};

const settings = window.enmity.settings.makeStore(manifest.name);
const patcher = window.enmity.patcher.create(manifest.name);
const React = window.enmity.modules.common.React;
const { FormRow, FormSwitch, FormSection } = window.enmity.modules.common.components;
const { getByProps } = window.enmity.modules;
const { createThemedStyleSheet } = window.enmity.modules.common.StyleSheet;
const { Constants } = window.enmity.modules.common;

const spoofValues = {
  os: "Windows",
  browser: "Discord",
  device: "Desktop"
};

function patchIdentify() {
  const wsModule = getByProps("identify");
  if (!wsModule || !wsModule.identify) return;

  patcher.after("identify", wsModule, (_, [data]) => {
    if (!data?.properties) return;
    if (!settings.getBoolean("enabled", true)) return;

    data.properties.$os = spoofValues.os;
    data.properties.$browser = spoofValues.browser;
    data.properties.$device = spoofValues.device;
  });
}

function SettingsPanel() {
  return React.createElement(FormSection, {
    title: "Desktop Spoof Settings",
    children: React.createElement(FormRow, {
      label: "Enable Spoofing",
      subLabel: "Toggle to spoof your client as a desktop",
      trailing: React.createElement(FormSwitch, {
        value: settings.getBoolean("enabled", true),
        onValueChange: (val) => settings.set("enabled", val)
      })
    })
  });
}

window.enmity.plugins.registerPlugin({
  ...manifest,
  onStart() {
    patchIdentify();
  },
  onStop() {
    patcher.unpatchAll();
  },
  getSettingsPanel() {
    return React.createElement(SettingsPanel);
  }
});
