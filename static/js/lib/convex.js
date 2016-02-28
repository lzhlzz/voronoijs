function import$(t,r){var i={}.hasOwnProperty;for(var n in r)i.call(r,n)&&(t[n]=r[n]);return t}function in$(t,r){for(var i=-1,n=r.length>>>0;++i<n;)if(t===r[i])return!0;return!1}Voronoi.Convex=function(t){function r(t){return l.center[t]=[0,1,2,3].reduce(function(r,i){return r+l.pts[o[i]][t]},0)/4}function i(t){return t.map(function(t){return o[t]})}function n(t){return t.trivial}function e(t,r){var i;return i=Aux.sub(l.center,l.pts[t]),["x","y","z"].reduce(function(t,r){return t+Math.pow(i[r],2)},0),[i,r]}function s(t,r){return t[0]-r[0]}var h,o,u,f,a,c,p,l=this;if(this.pts=t,this.polygons=[],this.edges={},this.pts.forEach(function(t){return t.z=Math.pow(t.x,2)+Math.pow(t.y,2)-t.weight}),this.pair={f2p:{},p2f:{}},this.faces.list=[],!(this.pts.length<4)){for(h=[[0,1,2,3],3],o=h[0],this.idx=h[1];this.idx<this.pts.length;){for(this.idx++,this.center={},["x","y","z"].map(r),f=[],a=0,c=(h=[[0,1,2],[0,1,3],[0,2,3],[1,2,3]].map(i)).length;c>a;++a)p=h[a],f.push(new Voronoi.face(this,p));if(u=f,!u.filter(n).length)break;p=o.map(e).sort(s)[0][1],o.splice(o.indexOf(p),1),o.push(this.idx)}return this.faces.add(u),u.forEach(function(t,r){return l.pts.forEach(function(i,n){return t.front(i)?l.setPair(r,n,t,i):void 0})}),this}},import$(Voronoi.Convex.prototype,{getPairByPtr:function(t){return this.pair.p2f[t]||[]},getPairByFace:function(t){return this.pair.f2p[t]||[]},setPair:function(t,r,i,n){var e,s;return((e=(s=this.pair).f2p||(s.f2p={}))[t]||(e[t]=[])).push(n),((e=(s=this.pair).p2f||(s.p2f={}))[r]||(e[r]=[])).push(i)},faces:{contain:function(t){return in$(t,this.list)},add:function(t){return Array.isArray(t)?this.list=this.list.concat(t):this.list.push(t)},remove:function(t){var r=this;return Array.isArray(t)||(t=[t]),t.forEach(function(t){var i;return i=r.list.indexOf(t),i>=0?r.list.splice(i,1):void 0})}},polygonReorder:function(t){var r,i,n,e;return r=t.reduce(function(t,r){return t+r.x},0)/t.length,i=t.reduce(function(t,r){return t+r.y},0)/t.length,n=Math.pow(r,2)+Math.pow(i,2),e=function(t){var e,s,h;return e=Math.sqrt(n*(Math.pow(t.x-r,2)+Math.pow(t.y-i,2))),s=Math.acos((-r*(t.x-r)-i*(t.y-i))/e),h=Math.acos((i*(t.x-r)-r*(t.y-i))/e),h>Math.PI/2&&(s=6.28-s),s},t.sort(function(t,r){return e(t)-e(r)})},grid:function(){function t(t,r){return t+r.x}function r(t,r){return t+r.y}var i,n,e,s,h,o,u,f,a,c,p,l,d,g,x,y,v,m,w=[];for(this.faces.list.forEach(function(t){return t.center=t.getCenter(),t}),this.faces.list=this.faces.list.filter(function(t){return!t.removed&&t.front(t.center)}),i=[],n=0,e=this.pts.length;e>n;++n)s=n,i.push([]);for(this.polygons=i,n=0,o=(h=this.pts).length;o>n;++n)u=h[n],u.visited=!1;for(f=[],n=0,o=(h=this.faces.list).length;o>n;++n){for(a=h[n],c=[],p=0,d=(l=a.idx).length;d>p;++p)if(u=l[p],!in$(u,f)){for(f.push(u),g=[],g.idx=u,x=0,v=(y=this.faces.list).length;v>x;++x)s=x,m=y[x],in$(u,m.idx)&&g.push(m.dual());this.polygonReorder(g),g.cx=g.reduce(t,0)/g.length,g.cy=g.reduce(r,0)/g.length,this.pts[u].boundary&&(g.boundary=!0),c.push(this.polygons[u]=g)}w.push(c)}return w},calculate:function(){for(;this.idx<this.pts.length;)this.iterate();return this.grid()},iterate:function(){var t,r,i,n,e,s,h,o,u,f,a,c,p,l,d,g,x,y,v,m,w,M;if(t=(new Date).getTime(),!(this.idx>=this.pts.length)){for(r=this.getPairByPtr(this.idx),i=[],n=0,e=r.length;e>n;++n)if(s=r[n],!s.removed)for(h=0,u=(o=s.edges).length;u>h;++h)f=o[h],f.ref?f.dup=!0:i.push(f),f.ref++;return a=i.filter(function(t){return t.ref<2}),r.map(function(t){return t.removed=!0}),c=(new Date).getTime(),this.faces.add(p=function(){var t,r,i,n=[];for(t=0,i=(r=a).length;i>t;++t)f=r[t],n.push(new Voronoi.face(this,f.concat([this.idx]),!0));return n}.call(this)),o=[this.pts,this.pair,this.idx,this.faces.list.length,this.pts.length,p.length],l=o[0],d=o[1],g=o[2],x=o[3],y=o[4],v=o[5],m=(new Date).getTime(),p.forEach(function(t,r){var i,n,e,s,h,o,u,f=[];for(r+=x-v,i=[t.norm,t.precal],n=i[0],e=i[1],s=g+1,h=y;h>s;++s)o=s,u=l[o],n.x*u.x+n.y*u.y+n.z*u.z-e>0&&(((i=d.f2p)[r]||(i[r]=[])).push(u),f.push(((i=d.p2f)[o]||(i[o]=[])).push(t)));return f}),this.idx++,w=(new Date).getTime(),this.e1=(null!=(M=this.e1)?M:0)+(c-t),this.e2=(null!=(M=this.e2)?M:0)+(m-c),this.e3=(null!=(M=this.e3)?M:0)+(w-m)}}});