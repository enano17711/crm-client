import { defineConfig } from "@kubb/core"
import createSwagger from "@kubb/swagger"
import createSwaggerTS from "@kubb/swagger-ts"
import createSwaggerTanstackQuery from "@kubb/swagger-tanstack-query"

export default defineConfig({
   root: ".",
   input: {
      path: "./openapi.yaml",
   },
   output: {
      path: "./src/api-gen",
      clean: true,
   },
   hooks: {
      done: ['prettier --write "**/*.{ts,tsx}"'],
   },
   plugins: [
      createSwagger({ output: false, validate: true }),
      createSwaggerTS({
         output: "models",
         groupBy: { type: "tag" },
         dateType: "date",
      }),
      createSwaggerTanstackQuery({
         transformers: {
            name: (name) => {
               return `${name}Hook`
            },
         },
         output: "./hooks",
         framework: "react",
         groupBy: {
            type: "tag",
         },
         client: "./src/client.ts",
      }),
   ],
})
