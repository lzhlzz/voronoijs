function import$(t,n){var r={}.hasOwnProperty;for(var i in n)r.call(n,i)&&(t[i]=n[i]);return t}function in$(t,n){for(var r=-1,i=n.length>>>0;++r<i;)if(t===n[r])return!0;return!1}Voronoi.Convex=function(t){function n(t){return d.center[t]=[0,1,2,3].reduce(function(n,r){return n+d.pts[u[r]][t]},0)/4}function r(t){return t.map(function(t){return u[t]})}function i(t){return t.trivial}function e(t,n){var r;return r=Aux.sub(d.center,d.pts[t]),["x","y","z"].reduce(function(t,n){return t+Math.pow(r[n],2)},0),[r,n]}function o(t,n){return t[0]-n[0]}var s,u,h,f,c,a,p,d=this;if(this.pts=t,this.polygons=[],this.faces.list=[],!(this.pts.length<4)){for(s=[[0,1,2,3],3],u=s[0],this.idx=s[1];this.idx<this.pts.length;){for(this.idx++,this.center={},["x","y","z"].map(n),f=[],c=0,a=(s=[[0,1,2],[0,1,3],[0,2,3],[1,2,3]].map(r)).length;a>c;++c)p=s[c],f.push(new Voronoi.face(this,p));if(h=f,!h.filter(i).length)break;p=u.map(e).sort(o)[0][1],u.splice(u.indexOf(p),1),u.push(this.idx)}return this.faces.add(h),h.forEach(function(t){return d.pts.forEach(function(n){return t.front(n)?d.setPair(t,n):void 0})}),this}},import$(Voronoi.Convex.prototype,{pair:{f2p:{},p2f:{}},getPairByPtr:function(t){return this.pair.p2f[t]||[]},getPairByFace:function(t){return this.pair.f2p[t]||[]},setPair:function(t,n){var r,i,e;return((r=(e=this.pair).f2p||(e.f2p={}))[i=this.faces.list.indexOf(t)]||(r[i]=[])).push(n),((r=(e=this.pair).p2f||(e.p2f={}))[i=this.pts.indexOf(n)]||(r[i]=[])).push(t)},faces:{list:[],contain:function(t){return in$(t,this.list)},add:function(t){return Array.isArray(t)?this.list=this.list.concat(t):this.list.push(t)},remove:function(t){var n=this;return Array.isArray(t)||(t=[t]),t.forEach(function(t){var r;return r=n.list.indexOf(t),r>=0?n.list.splice(r,1):void 0})}},polygonReorder:function(t){var n,r,i,e;return n=t.reduce(function(t,n){return t+n.x},0)/t.length,r=t.reduce(function(t,n){return t+n.y},0)/t.length,i=Math.pow(n,2)+Math.pow(r,2),e=function(t){var e,o,s;return e=Math.sqrt(i*(Math.pow(t.x-n,2)+Math.pow(t.y-r,2))),o=Math.acos((-n*(t.x-n)-r*(t.y-r))/e),s=Math.acos((r*(t.x-n)-n*(t.y-r))/e),s>Math.PI/2&&(o=6.28-o),o},t.sort(function(t,n){return e(t)-e(n)})},grid:function(){function t(t,n){return t+n.x}function n(t,n){return t+n.y}var r,i,e,o,s,u,h,f,c,a,p,d,l,x,g,y;for(this.polygons=[],r=0,e=(i=this.pts).length;e>r;++r)o=i[r],o.visited=!1;for(s=[],r=0,e=(i=this.faces.list).length;e>r;++r)if(u=i[r],h=u.center(),u.front({x:h.x,y:h.y,z:-100}))for(f=0,a=(c=u.idx).length;a>f;++f)if(o=c[f],!in$(o,s)){for(s.push(o),p=[],p.idx=o,d=0,x=(l=this.faces.list).length;x>d;++d)g=d,y=l[d],h=y.center(),y.front({x:h.x,y:h.y,z:-100})&&in$(o,y.idx)&&p.push(y.dual());this.polygonReorder(p),p.cx=p.reduce(t,0)/p.length,p.cy=p.reduce(n,0)/p.length,this.pts[o].boundary&&(p.boundary=!0),this.polygons.push(p)}return console.log(this.pts.length,"vs",this.polygons.length)},calculate:function(){for(;this.idx<this.pts.length;)this.iterate();return this.grid()},iterate:function(){function t(t){return t.node[0]===f.node[0]&&t.node[1]===f.node[1]}function n(t){return t.dup=!0,t}var r,i,e,o,s,u,h,f,c,a,p,d=this;if(!(this.idx>=this.pts.length)){for(r=this.getPair(idx),i=[],e=0,o=r.length;o>e;++e)if(s=r[e],this.faces.contain(s))for(u=0;3>u;++u)h=u,f={dup:!1,node:[s.idx[h],s.idx[(h+1)%3]]},f.node[0]>f.node[1]&&f.node.reverse(),c=i.filter(t).map(n),c.length||i.push(f);return a=i.filter(function(t){return!t.dup}).map(function(t){return t.node}),this.faces.remove(r),this.faces.add(p=function(){var t,n,r,i=[];for(t=0,r=(n=a).length;r>t;++t)f=n[t],i.push(new Voronoi.face(this,f.concat([this.idx]),!0));return i}.call(this)),p.forEach(function(t){return d.pts.forEach(function(n){return t.front(n)?d.setPair(t,n):void 0})}),this.idx++}}});