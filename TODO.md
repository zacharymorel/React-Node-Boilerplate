TODO => 
- Enable cache busting in Webpack 
  - => DEV done, Prod revisit to use HashedModuleIdsPlugin instead of NamedModulesPlugin. 
- Add debug commands to package.json
- Hot module replacement
- Auto-restart web server when changes are detected via nodemon
- Clean up scripts commands chain
- NOTE: Some of these I might leave out if I deem unnecessary  



NOTES: 
Node v8 engine still doesn't properly support es6 module loading Import/ Export.  The underlying Common js api still hasn't built a proper bridge.  As a result, I turned off the Node Eslint plugin. 
 