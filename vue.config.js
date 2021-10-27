module.exports = {
  devServer:{
    proxy:{
      '/proxy':{
        //设置代理地址
        //target:"http://106.14.162.49:8200",   
        target:"http://127.0.0.1:8200",   
        changeOrigin:true,
        ws:true,
        pathRewrite:{
          "^/proxy":""
        }
      }
    }
  },
  css:{
      loaderOptions:{
          less:{
              modifyVars: {
                  //在此处设置，也可以设置直角、边框色、字体大小等
                  // 'primary-color': '#1890ff',
              },
              javascriptEnabled:true
          }

      }

  }
}
