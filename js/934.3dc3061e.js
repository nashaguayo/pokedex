"use strict";(self["webpackChunkpokedex"]=self["webpackChunkpokedex"]||[]).push([[934],{6934:function(t,e,i){i.r(e),i.d(e,{default:function(){return u}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"install-view"},[e("BaseLoader",{attrs:{cover:!0,loading:t.installing||t.loading}},[e("div",{staticClass:"content"},[e("h1",[t._v(t._s(t.$t("install.title")))]),e("span",[t._v(t._s(t.$t("install.description")))]),e("BaseButton",{attrs:{big:!0,variant:!0,onClickHandler:t.install}},[t._v(t._s(t.$t("install.button")))]),e("img",{attrs:{src:i(2614),alt:"silouette"}})],1)])],1)},s=[],n=(i(7658),i(1124)),r=i(241),l=i(2367),o={name:"InstallView",title:"Install",components:{BaseButton:n.Z,BaseLoader:r.Z},data(){return{deferredInstallPrompt:null,installing:!1,loading:!0}},async created(){if(window.addEventListener("beforeinstallprompt",this.beforeInstallPrompt),window.addEventListener("appinstalled",this.appInstalled),await(0,l.Ts)()){const t={name:"launchApp"};this.$route?.query?.redirect&&(t.query=this.$route.query),this.$router.push(t)}},beforeDestroy(){window.removeEventListener("beforeinstallprompt",this.beforeInstallPrompt),window.removeEventListener("appinstalled",this.appInstalled)},methods:{async install(){this.installing=!0,await this.deferredInstallPrompt.prompt();const{outcome:t}=await this.deferredInstallPrompt.userChoice;"dismissed"===t&&(this.installing=!1)},beforeInstallPrompt(t){t.preventDefault(),this.deferredInstallPrompt=t,this.loading=!1},appInstalled(){this.$router.push({name:"download"})}}},A=o,d=i(1001),p=(0,d.Z)(A,a,s,!1,null,"eebca598",null),u=p.exports},2614:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAByCAMAAABTNM5MAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcQ8PDwoKCgYGBhEREQwMDBoaGgEBAQQEBBUVFQUFBQgICAUFBQMDAzIyMiMjI2ZmZioqKjMzMz4+Pl5eXl9fX4iIiAAAAAoKCg17FlsAAAAZdFJOUwAgW51IeTXxshLmidfFdPVzzazq55zu//2iGwLGAAACzklEQVRo3u2Z6c7qIBCGLfveXbj/Kz100dhPaTWdkpyE95+myQOzMQy3W1FRUVFRUVHRf6QKUUpyAok2nmOWESi4917kIyLhJ+EqHzBMQIMyA0O2LS4+9N7m2iLBC1BpmSkPtZqB2QJVUuPz2hRZv9o0U9iwJUyByo0kNAohUsljJxKQkLCcc6WMxZoiwrZYWTHGCKwTyeqhyWYRK7Rroty0b6q1xkJ0w7pDQ0ESg+HgX8Xrfhj6mq+aikz4EzXyJJhooTbMiNguwr9GTXQ71uhkxDKKDfdHWqKGURs/NZic3GcVF27VLrV2cvbBag+rT4etZIi+2fdFLZuBz1Vx4SCKARvvSaNGItOvK4qmBUA2fYpokNwCp22i8+nikmbl7diZv38ClAQa0qEz1O/LOH1YSrwTrR8Wc57IrP9F0ZGnj0H1CxAiWCn/AWgpwGGpf7IoRAXAWS36E9FQmJZOfkuEa1q/9WPvoIjfZocSDqhRrr41azCCEpB9EpGuqzXfZCu3FKRbRsk6145OC/NaXC1MgjiTyPipsapQV78emTCu7EKCONuwGcKmLYBQqrYuO0IG8OA4IPKprj1bK24p2EUyWQXqsXGP5tFoAnZV3ql0w/3Rd6kO8KZcpTOyv/erTWtIIkkmZKjv46OHVhiBWTXdP/rQMcloG4AHAnSnmE4pKcdh+QF2YO3V8rmsuSV8FJWXh+pCkZovjoSKnf3zqm0abYDzfyc55mjtFXD+7xMjMoD1jd8RFw/CzskPiYYCjwIPiKF10IO5A2LrwKer+0QDDzzIjiteOnZrzjWvAHtXyGsm1unzMZbVa0bwz+4xKBOl+LNdbK95ImNr6Ki2ow5FaWHrANmDf7aqiheZxxS7QuPSFpuLiIJ7ZbeHQ9XMrcZFD1YSafx2UZPzE9Jlbx3y06MA0dbqjC+d89CXVLeioqKioqKioqKioqId/QMCV6wi9YBqyAAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=934.3dc3061e.js.map