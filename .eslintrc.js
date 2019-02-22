module.exports = {
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'standard/no-callback-literal': 0,
  },
  globals: {
    "appRoot": false,
    "log": false
  }
}