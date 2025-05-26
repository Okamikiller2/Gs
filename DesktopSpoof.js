function h(o) { window.enmity.plugins.registerPlugin(o); }
function g(o) { return window.enmity.patcher.create(o); }
const y = window.enmity.modules.common.Constants;
const t = window.enmity.modules.common.React;
const S = window.enmity.modules.common.Linking;
const b = window.enmity.modules.common.StyleSheet;

const a = "DesktopSpoofer";
const l = "1.0.0";
const F = "Spoofs iPad Discord client as desktop.";
const T = [{ name: "SerStars", id: "861631850681729045" }];
const E = "#000001";
const R = { name: a, version: l, description: F, authors: T, color: E };

const u = g("DesktopSpoofer");

const DesktopSpoofer = ({ settings }) => {
  const styles = b.createThemedStyleSheet({
    footer: {
      color: y.ThemeColorMap.HEADER_SECONDARY,
      textAlign: "center",
      paddingTop: 10,
      paddingBottom: 20
    }
  });

  return t.createElement(
    window.enmity.components.ScrollView,
    null,
    t.createElement(
      window.enmity.components.FormSection,
      { title: "SETTINGS" },
      t.createElement(
        window.enmity.components.FormRow,
        {
          label: "Enable Desktop Spoof",
          subLabel: "Make Discord think you're on desktop",
          trailing: t.createElement(
            window.enmity.components.FormSwitch,
            {
              value: settings.getBoolean("spoofDesktop", true),
              onValueChange: n => settings.set("spoofDesktop", n)
            }
          )
        }
      )
    ),
    t.createElement(
      window.enmity.components.FormSection,
      { title: "INFORMATION" },
      t.createElement(
        window.enmity.components.FormRow,
        {
          label: "Check Source Code",
          trailing: window.enmity.components.FormRow.Arrow,
          onPress: () => S.openURL("https://raw.githubusercontent.com/Okamikiller2/Gs/refs/heads/main/DesktopSpoof.js")
        }
      )
    ),
    t.createElement(
      window.enmity.components.Text,
      { style: styles.footer },
      `v${l}`
    )
  );
};

h({
  ...R,
  onStart() {
    const spoof = () => ({
      platform: "desktop",
      os: navigator.userAgent.includes("Mac") ? "macOS" : "Windows"
    });

    u.instead(window, "navigator", () => ({
      ...navigator,
      userAgent: navigator.userAgent.replace(/iPad/i, "Desktop"),
      platform: spoof().platform,
      os: spoof().os
    }));

    u.after(window.enmity.modules.common, "getPlatform", () => "desktop");
  },
  onStop() {
    u.unpatchAll();
  },
  getSettingsPanel({ settings }) {
    return t.createElement(DesktopSpoofer, { settings });
  }
});
