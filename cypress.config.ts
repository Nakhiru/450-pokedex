import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: false
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      options: {
        projectConfig: {
          root: '',
          sourceRoot: '',
          buildOptions: {
            tsConfig: 'cypress/tsconfig.json',
          }
        }
      }
    }
  }
});
