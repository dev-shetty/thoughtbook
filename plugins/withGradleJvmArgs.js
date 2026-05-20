const { withGradleProperties } = require("expo/config-plugins");

module.exports = function withGradleJvmArgs(config) {
  return withGradleProperties(config, (config) => {
    const jvmArgsEntry = config.modResults.find(
      (item) => item.type === "property" && item.key === "org.gradle.jvmargs"
    );

    if (jvmArgsEntry) {
      jvmArgsEntry.value = "-Xmx4096m -XX:MaxMetaspaceSize=1024m";
    } else {
      config.modResults.push({
        type: "property",
        key: "org.gradle.jvmargs",
        value: "-Xmx4096m -XX:MaxMetaspaceSize=1024m",
      });
    }

    return config;
  });
};
