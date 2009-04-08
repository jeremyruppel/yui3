YUI.add("selector",function(C){C.namespace("Selector");var L="parentNode",D="length",I={_reLead:/^\s*([>+~]|:self)/,_reUnSupported:/!./,_foundCache:[],_supportsNative:function(){return((C.UA.ie>=8||C.UA.webkit>525)&&document.querySelectorAll);},_toArray:function(O){var P=O;if(!O.slice){try{P=Array.prototype.slice.call(O);}catch(R){P=[];for(var Q=0,N=O[D];Q<N;++Q){P[Q]=O[Q];}}}return P;},_clearFoundCache:function(){var Q=I._foundCache;for(var O=0,N=Q[D];O<N;++O){try{delete Q[O]._found;}catch(P){Q[O].removeAttribute("_found");}}Q=[];},_sort:function(N){if(N){N=I._toArray(N);if(N.sort){N.sort(function(P,O){return C.DOM.srcIndex(P)-C.DOM.srcIndex(O);});}}return N;},_deDupe:function(O){var P=[],N=I._foundCache;for(var Q=0,R;R=O[Q++];){if(!R._found){P[P[D]]=N[N[D]]=R;R._found=true;}}I._clearFoundCache();return P;},_prepQuery:function(Q,P){var O=P.split(","),R=[],T=(Q&&Q.nodeType===9);if(Q){if(!T){Q.id=Q.id||C.guid();for(var S=0,N=O[D];S<N;++S){P="#"+Q.id+" "+O[S];R.push({root:Q.ownerDocument,selector:P});}}else{R.push({root:Q,selector:P});}}return R;},_query:function(N,U,V){if(I._reUnSupported.test(N)){return I._brute.query(N,U,V);}var R=V?null:[],S=V?"querySelector":"querySelectorAll",W,P;U=U||C.config.doc;if(N){P=I._prepQuery(U,N);R=[];for(var O=0,T;T=P[O++];){try{W=T.root[S](T.selector);if(W&&W.item){W=I._toArray(W);}R=R.concat(W);}catch(Q){}}if(P[D]>1){R=I._sort(I._deDupe(R));}R=(!V)?R:R[0]||null;}return R;},_filter:function(O,N){var P=[];if(O&&N){for(var Q=0,R;(R=O[Q++]);){if(C.Selector._test(R,N)){P[P[D]]=R;}}}else{}return P;},_test:function(S,O){var P=false,N=O.split(","),R;if(S&&S[L]){S.id=S.id||C.guid();S[L].id=S[L].id||C.guid();for(var Q=0,T;T=N[Q++];){T+="#"+S.id;R=C.Selector.query(T,null,true);P=(R===S);if(P){break;}}}return P;}};if(C.UA.ie&&C.UA.ie<=8){I._reUnSupported=/:(?:nth|not|root|only|checked|first|last|empty)/;}C.mix(C.Selector,I,true);if(I._supportsNative()){C.Selector.query=I._query;}C.Selector.test=I._test;C.Selector.filter=I._filter;var L="parentNode",K="tagName",F="attributes",G="combinator",E="pseudos",H="previous",J="previousSibling",D="length",B=[],A=C.Selector,M={SORT_RESULTS:false,_children:function(P){var N=P.children;if(!N){N=[];for(var O=0,Q;Q=P.childNodes[O++];){if(Q.tagName){N[N.length]=Q;}}B[B.length]=P;P.children=N;}return N;},_regexCache:{},_re:{attr:/(\[.*\])/g,urls:/^(?:href|src)/},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(O,N){return C.DOM.getAttribute(O,N[0])!=="";},"=":"^{val}$","~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(N){return C.Selector._children(N[L])[0]===N;}},_brute:{query:function(N,O,Q){var P=[];if(N){P=A._query(N,O,Q);}A._cleanup();return(Q)?(P[0]||null):P;}},some:function(){return(Array.prototype.some)?function(N,P,O){return Array.prototype.some.call(N,P,O);}:function(N,Q,P){for(var O=0,R;R=N[O++];){if(Q.call(P,R,O,N)){return true;}}return false;};}(),_cleanup:function(){for(var N=0,O;O=B[N++];){delete O.children;}B=[];},_query:function(R,W,X,P){var U=[],O=R.split(","),N=[],V,Q;if(O[D]>1){for(var S=0,T=O[D];S<T;++S){U=U.concat(arguments.callee(O[S],W,X,true));}U=A.SORT_RESULT?A._sort(U):U;A._clearFoundCache();}else{W=W||C.config.doc;if(W.nodeType!==9){if(!W.id){W.id=C.guid();}R="#"+W.id+" "+R;W=W.ownerDocument;}V=A._tokenize(R);Q=V.pop();if(Q){if(P){Q.deDupe=true;}if(V[0]&&V[0].id){W=W.getElementById(V[0].id);}if(W&&!N[D]&&Q.prefilter){N=Q.prefilter(W,Q);}if(N[D]){if(X){A.some(N,A._testToken,Q);}else{C.Array.each(N,A._testToken,Q);}}U=Q.result;}}return U;},_testToken:function(O,S,N,P){var P=P||this,U=P.tag,R=P[H],V=P.result,Q=0,T=R&&R[G]?A.combinators[R[G]]:null;if((U==="*"||U===O[K])&&!(O._found)){while((attr=P.tests[Q])){Q++;test=attr.test;if(test.test){if(!test.test(O[attr.name])){return false;}}else{if(!test(O,attr.match)){return false;}}}if(T&&!T(O,P)){return false;}V[V.length]=O;if(P.deDupe){O._found=true;A._foundCache.push(O);}return true;}return false;},_getRegExp:function(P,N){var O=A._regexCache;N=N||"";if(!O[P+N]){O[P+N]=new RegExp(P,N);}return O[P+N];},combinators:{" ":function(P,N){var Q=A._testToken,O=N[H];while((P=P[L])){if(Q(P,null,null,O)){return true;}}return false;},">":function(O,N){return A._testToken(O[L],null,null,N[H]);},"+":function(P,O){var N=P[J];while(N&&N.nodeType!==1){N=N[J];}if(N&&C.Selector._testToken(N,null,null,O[H])){return true;}return false;}},_parsers:[{name:K,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(O,N){O.tag=N[1].toUpperCase();O.prefilter=function(P){return P.getElementsByTagName(O.tag);};return true;}},{name:F,re:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(P,O){var Q=O[3],N=!(O[2]&&Q)?"":O[2],R=A.operators[N];if(typeof R==="string"){R=A._getRegExp(R.replace("{val}",Q));}if(O[1]==="id"&&Q){P.id=Q;P.prefilter=function(S){var U=S.nodeType===9?S:S.ownerDocument,T=U.getElementById(Q);return T?[T]:[];};}else{if(document.documentElement.getElementsByClassName&&O[1].indexOf("class")===0){if(!P.prefilter){P.prefilter=function(S){return S.getElementsByClassName(Q);};R=true;}}}return R;}},{name:G,re:/^\s*([>+~]|\s)\s*/,fn:function(O,N){O[G]=N[1];return !!A.combinators[O[G]];}},{name:E,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(O,N){return A[E][N[1]];}}],_getToken:function(N){return{previous:N,combinator:" ",tag:"*",prefilter:function(O){return O.getElementsByTagName("*");},tests:[],result:[]};},_tokenize:function(P){P=P||"";P=A._replaceShorthand(C.Lang.trim(P));var O=A._getToken(),U=P,T=[],V=false,S,R;outer:do{V=false;for(var Q=0,N;N=A._parsers[Q++];){if((R=N.re.exec(P))){S=N.fn(O,R);if(S){if(S!==true){O.tests.push({name:R[1],test:S,match:R.slice(1)});}V=true;P=P.replace(R[0],"");if(!P[D]||N.name===G){T.push(O);O=A._getToken(O);}}else{V=false;break outer;}}}}while(V&&P.length);if(!V||P.length){T=[];}return T;},_replaceShorthand:function(O){var P=A.shorthand,Q=O.match(A._re.attr);if(Q){O=O.replace(A._re.attr,"REPLACED_ATTRIBUTE");}for(var S in P){if(P.hasOwnProperty(S)){O=O.replace(A._getRegExp(S,"gi"),P[S]);
}}if(Q){for(var R=0,N=Q[D];R<N;++R){O=O.replace("REPLACED_ATTRIBUTE",Q[R]);}}return O;}};C.mix(C.Selector,M,true);if(!C.Selector._supportsNative()){C.Selector.query=A._brute.query;}},"@VERSION@",{requires:["dom-base","selector-native"],skinnable:false});