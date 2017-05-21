"use strict";

const { JSDOM } = require("jsdom");
const { replaceAll, dashify } = require("./utils");

module.exports = {
  hooks: {
    page: function(page) {
      var dom = new JSDOM(page.content);

      this.config.get("pluginsConfig.dashing.selectors").forEach(selector => {
        dom.window.document.querySelectorAll(selector).forEach(node => {
          node.innerHTML = dashify(node.innerHTML);
          if (node.innerHTML.indexOf('dash;') !== -1) {
            console.log(node.innerHTML);
          }
        });
      });

      page.content = dom.window.document.body.innerHTML;
      return page;
    }
  }
}
