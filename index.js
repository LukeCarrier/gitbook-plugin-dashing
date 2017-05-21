"use strict";

const { JSDOM } = require("jsdom");

function replaceAll(text, find, replace) {
  return text.split(find).join(replace);
}

function dashify(text) {
  text = replaceAll(text, "---", "&mdash;")
  text = replaceAll(text, "--", "&ndash;");

  return text;
}

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
