new TestSuite("QueryString Tests", {

  testEmptyQueryString : function(t){
    var qs = new QueryString("");
  },
  
  testQueryString : function(t){
    var qs = new QueryString("part1=foo&part2=bar");
    var parts = qs.parts;
    t.assert(parts.part1 == "foo", "Incorrect part1 value " + parts.part1); 
    t.assert(parts.part2 == "bar", "Incorrect part2 value " + parts.part2);
  },
  
  testQueryStringWithLeadingQuestionMark : function(t){
    var qs = new QueryString("?part1=foo&part2=bar");
    var parts = qs.parts;
    t.assert(parts.part1 == "foo", "Incorrect part1 value " + parts.part1); 
    t.assert(parts.part2 == "bar", "Incorrect part2 value " + parts.part2);
  }


});
