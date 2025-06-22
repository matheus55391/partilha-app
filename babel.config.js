module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@services": "./src/services",
            "@lib": "./src/lib",
            "@stores": "./src/stores",
            "@hooks": "./src/hooks",
            "@types": "./src/types",
            "@constants": "./src/constants",
            "@assets": "./assets",
            "@app": "./src/app",
            "@styles": "./src/styles",
            "@contexts": "./src/contexts",
            "@utils": "./src/utils"
          },
        },
      ],
    ],
  };
};
