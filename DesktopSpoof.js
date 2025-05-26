function h(o) { window.enmity.plugins.registerPlugin(o); }
function g(o) { return window.enmity.patcher.create(o); }
const y = window.enmity.modules.common.Constants;
const t = window.enmity.modules.common.React;
const S = window.enmity.modules.common.Linking;
const b = window.enmity.modules.common.StyleSheet;

const a = "NSFWAccessEnabler";
const l = "1.0.0";
const F = "Enables access to age-restricted servers on iOS via desktop toggle.";
const T = [{ name: "SerStars", id: "861631850681729045" }];
const E = "#000001";
const R = { name: a, version: l, description: F, authors: T, color: E };

const u = g("NSFWAccessEnabler");

const NSFWAccessEnabler = ({ settings }) => {
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
          label: "Enable NSFW Access",
          subLabel: "Prompts to enable NSFW access on desktop",
          trailing: t.createElement(
            window.enmity.components.FormSwitch,
            {
              value: settings.getBoolean("enableNSFW", true),
              onValueChange: n => settings.set("enableNSFW", n)
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
          label: "Enable NSFW on Desktop",
          trailing: window.enmity.components.FormRow.Arrow,
          onPress: () => S.openURL("https://support.discord.com/hc/en-us/articles/1500005292701")
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
    if (settings.getBoolean("enableNSFW", true)) {
      S.openURL("https://support.discord.com/hc/en-us/articles/1500005292701");
    }
  },
  onStop() {
    u.unpatchAll();
  },
  getSettingsPanel({ settings }) {
    return t.createElement(NSFWAccessEnabler, { settings });
  }
});
