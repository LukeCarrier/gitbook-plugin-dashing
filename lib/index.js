"use strict";

const { JSDOM } = require("jsdom");
const { replaceAll, dashify } = require("./utils");

module.exports = {
  hooks: {
    page: function(page) {
      var dom = new JSDOM(page.content);

      this.config.get("pluginsConfig.dashing.selectors").forEach(selector => {
        dom.querySelectorAll(selector).forEach(node => {
          node.innerHTML = dashify(node.innerHTML);
        });
      });

      page.content = dom.body.innerHTML;
      return page;
    }
  }
}
