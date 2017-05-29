"use strict";

describe("utils", () => {
  const { replaceAll, dashify } = require("../lib/utils");

  it("replaceAll should replace all occurrences", () => {
    const text = `
      I know a song that gets on everyone's nerves
      everyone's nerves,
      everyone's nerves.
    `;

    let result = replaceAll(text, 'everyone', 'Luke');
    expect(result).toContain('Luke');
    expect(result).not.toContain('everyone');
  });

  it("dashify should replace hyphens with approriate dashes", () => {
    // https://www.quora.com/In-which-10-days-of-May-did-Brendan-Eich-write-JavaScript-Mocha-in-1995
    const en = "From a calendar, I think it might have been May 6--15, 1995.";
    const em = "I worked from the office, so Jeff Weinstein --- cube-mate and friend from MicroUnity and SGI --- may recall or have a mail archive.";
    const combo = en + " " + em;

    const enPost = "From a calendar, I think it might have been May 6&ndash;15, 1995.";
    const emPost = "I worked from the office, so Jeff Weinstein &mdash; cube-mate and friend from MicroUnity and SGI &mdash; may recall or have a mail archive.";
    const comboPost = enPost + " " + emPost;

    let result;

    result = dashify(en);
    expect(result).toEqual(enPost);

    result = dashify(em);
    expect(result).toEqual(emPost);

    result = dashify(combo);
    expect(result).toEqual(comboPost);
  });
});
