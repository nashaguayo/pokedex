"use strict";(self["webpackChunkpokedex"]=self["webpackChunkpokedex"]||[]).push([[407],{9201:function(e,t,o){o.d(t,{Z:function(){return h}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"favorites-carousel"},[t("h1",[e._v("Favorites")]),t("div",{staticClass:"carousel"},[e.favoritePokemons.length?[t("div",{ref:"favorites",staticClass:"favorites"},e._l(e.favoritePokemons,(function(o){return t("FavoritesContentItem",{key:`favorite-${o.name}`,attrs:{name:o.name,image:o.smallImage,small:!0},on:{goToPage:e.goToPage}})})),1),t("div",{staticClass:"overlay"},[t("transition",{attrs:{name:"fade-in",appear:""}},[0!==e.scrollX?t("div",{staticClass:"left-overlay"}):e._e()]),t("transition",{attrs:{name:"fade-in",appear:""}},[e.disableRightButton?e._e():t("div",{staticClass:"right-overlay"})])],1),t("div",{staticClass:"navigation"},[t("BaseChevron",{attrs:{direction:"left",onClickHandler:e.scrollToLeft,disabled:0===e.scrollX,variant:!0}}),t("BaseButton",{attrs:{onClickHandler:e.goToMyFavorites,big:!0}},[e._v(" All Favorites ")]),t("BaseChevron",{attrs:{direction:"right",onClickHandler:e.scrollToRight,variant:!0,disabled:e.disableRightButton}})],1)]:t("div",{staticClass:"no-favorites-message"},[t("span",[e._v(e._s(e.$t("favorites.noFavoritesMessage")))])])],2)])},a=[],i=(o(7658),o(5223)),r=o(1124),n=o(220),l=o(3778),d={name:"FavoritesCarousel",components:{BaseButton:r.Z,BaseChevron:n.Z,FavoritesContentItem:i.Z},data(){return{favoritePokemons:[],scrollX:0,disableRightButton:!1}},created(){this.favoritePokemons=(0,l.rG)()},mounted(){document.querySelector(".favorites")&&document.querySelector(".favorites").addEventListener("scrollend",this.handleScrollEnd),this.isOverflowingX(this.$refs.favorites)||(this.disableRightButton=!0)},beforeDestroy(){document.querySelector(".favorites")&&document.querySelector(".favorites").removeEventListener("scrollend",this.handleScrollEnd)},methods:{goToPage(e){this.$router.push({name:"pokemon",params:{id:e}})},goToMyFavorites(){this.$router.push({name:"favorites"})},async scrollToRight(){this.scrollX+=this.$refs.favorites.offsetWidth-100,document.querySelector(".favorites").scroll({top:0,left:this.scrollX,behavior:"smooth"})},scrollToLeft(){this.scrollX-=this.$refs.favorites.offsetWidth-100,document.querySelector(".favorites").scroll({top:0,left:this.scrollX,behavior:"smooth"})},handleScrollEnd(){this.scrollX=this.$refs.favorites.scrollLeft,this.$refs.favorites.scrollLeft+this.$refs.favorites.offsetWidth>=this.$refs.favorites.scrollWidth?this.disableRightButton=!0:this.disableRightButton=!1},isOverflowingX(e){return!!e&&e.scrollWidth!=Math.max(e.offsetWidth,e.clientWidth)}}},c=d,m=o(1001),u=(0,m.Z)(c,s,a,!1,null,"3feca7d0",null),h=u.exports},5223:function(e,t,o){o.d(t,{Z:function(){return d}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"favorites-content-item",on:{click:function(t){return e.$emit("goToPage",e.name)}}},[e.id?t("span",{staticClass:"id"},[e._v("#"+e._s(e.id))]):e._e(),t("div",{staticClass:"image-container"},[t("div",{staticClass:"image",style:{backgroundImage:`url(${e.image})`}}),t("div",{staticClass:"background"})]),t("span",{staticClass:"name"},[e._v(e._s(e.name))])])},a=[],i={name:"FavoritesContentItem",props:{id:{type:Number,required:!1},name:{type:String,required:!0},image:{type:String,required:!0},small:{type:Boolean,default:!1}}},r=i,n=o(1001),l=(0,n.Z)(r,s,a,!1,null,"32d0d852",null),d=l.exports},1407:function(e,t,o){o.r(t),o.d(t,{default:function(){return K}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"pokemons-view"},[t("ErrorBoundary",{attrs:{componentName:"FavoritesCarousel",errorMessage:"Unable to load favorites"}},[t("FavoritesCarousel")],1),t("ErrorBoundary",{attrs:{componentName:"PokemonList",errorMessage:"Unable to load Pokemon list"}},[t("PokemonList")],1)],1)},a=[],i=o(1435),r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"pokemon-list"},[t("transition",{attrs:{name:"slide-up",appear:"",mode:"out-in"}},[e.pokemons.length||e.loading?t("div",{key:"results",staticClass:"pokemons-container"},[t("h1",[e._v(e._s(e.$t("pokemons.title")))]),t("transition-group",{staticClass:"pokemons",attrs:{name:"slide-up"}},e._l(e.pokemons,(function(e){return t("PokemonListCard",{key:e.name,attrs:{id:e.id,name:e.name,image:e.image,types:e.types}})})),1),t("BaseLoader",{attrs:{loading:e.loading}})],1):t("div",{key:"no-results"},[t("h2",[e._v("Something went wrong!")]),t("p",[e._v("No pokemons to display.")])])])],1)},n=[],l=o(3279),d=o.n(l),c=function(){var e=this,t=e._self._c;return t("div",{staticClass:"pokemon-list-card",class:{"shrink-animation":e.wasClicked},on:{click:e.showPokemonInfo,animationend:e.onAnimationEnd}},[t("span",{staticClass:"id"},[e._v("#"+e._s(e.id))]),t("img",{staticClass:"screen",attrs:{src:e.image,alt:"pokemon front default"}}),t("span",{staticClass:"name"},[e._v(e._s(e.image===e.silouette?"???":e.name.replace("-"," ")))]),t("div",{staticClass:"types"},e._l(e.types,(function(o){return t("span",{key:`type-${o.name}`,staticClass:"type",style:{backgroundColor:e.pokemonColorTypes.get(o.name)}},[e._v(" "+e._s(o.translated)+" ")])})),0)])},m=[],u=(o(7658),o(2614)),h=o(4625),v=o(8632),f={name:"PokemonListCard",data(){return{wasClicked:!1,silouette:u,pokemonColorTypes:h.o}},props:{id:{type:Number,required:!0},name:{type:String,required:!0},image:{required:!0},types:{type:Array,required:!0}},methods:{async showPokemonInfo(){this.wasClicked=!0;const e=this.name.split("-")[0];await(0,v.p8)(this.name)?this.$router.push({name:"pokemon",params:{id:e},query:{variantName:this.name.replace(`${e}-`,"")}}):this.$router.push({name:"pokemon",params:{id:this.name}})},onAnimationEnd(){this.wasClicked=!1}}},p=f,g=o(1001),k=(0,g.Z)(p,c,m,!1,null,"6b5c690c",null),C=k.exports,y=o(241),A=o(2367),P=o(6335),b=o(1511),w=o(6619),B={name:"PokemonList",components:{BaseLoader:y.Z,PokemonListCard:C},data(){return{loading:!0,amountOfPokemonsToLoadPerPage:20}},computed:{pokemons(){return b.Z.state.pokemons}},async created(){window.innerWidth>=P.E&&window.innerWidth<P.k7&&(this.amountOfPokemonsToLoadPerPage=21),await this.getPokemons()},mounted(){(0,A.Gj)(),this.debouncedScroll=d()(this.handleScroll,100),(0,A.eQ)().addEventListener("scroll",this.debouncedScroll),(0,A.eQ)().addEventListener("touchmove",this.debouncedScroll)},beforeDestroy(){(0,A.eQ)().removeEventListener("scroll",this.debouncedScroll),(0,A.eQ)().removeEventListener("touchmove",this.debouncedScroll)},methods:{async getPokemons(){await(0,w.LD)(null,this.amountOfPokemonsToLoadPerPage),this.loading=!1},async handleScroll({target:{scrollTop:e,clientHeight:t,scrollHeight:o}}){e+t+100>=o&&(this.loading=!0,await(0,w.oF)(this.amountOfPokemonsToLoadPerPage),this.loading=!1)}}},L=B,q=(0,g.Z)(L,r,n,!1,null,"353e3efc",null),Z=q.exports,E=o(9201),F={name:"PokemonsView",title:"Pokemons",components:{FavoritesCarousel:E.Z,PokemonList:Z,ErrorBoundary:i.Z}},S=F,_=(0,g.Z)(S,s,a,!1,null,"68875994",null),K=_.exports},4625:function(e,t,o){o.d(t,{o:function(){return s}});const s=new Map([["normal","black"],["fighting","purple"],["flying","blue"],["poison","violet"],["ground","brown"],["rock","darkgrey"],["bug","fuchsia"],["ghost","coral"],["steel","grey"],["fire","red"],["water","aquamarine"],["grass","lime"],["electric","orange"],["psychic","blueviolet"],["ice","blanchedalmond"],["dragon","chocolate"],["dark","darkolivegreen"],["fairy","darkorange"],["unknown","black"],["shadow","darksalmon"]])},2614:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAByCAMAAABTNM5MAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcQ8PDwoKCgYGBhEREQwMDBoaGgEBAQQEBBUVFQUFBQgICAUFBQMDAzIyMiMjI2ZmZioqKjMzMz4+Pl5eXl9fX4iIiAAAAAoKCg17FlsAAAAZdFJOUwAgW51IeTXxshLmidfFdPVzzazq55zu//2iGwLGAAACzklEQVRo3u2Z6c7qIBCGLfveXbj/Kz100dhPaTWdkpyE95+myQOzMQy3W1FRUVFRUVHRf6QKUUpyAok2nmOWESi4917kIyLhJ+EqHzBMQIMyA0O2LS4+9N7m2iLBC1BpmSkPtZqB2QJVUuPz2hRZv9o0U9iwJUyByo0kNAohUsljJxKQkLCcc6WMxZoiwrZYWTHGCKwTyeqhyWYRK7Rroty0b6q1xkJ0w7pDQ0ESg+HgX8Xrfhj6mq+aikz4EzXyJJhooTbMiNguwr9GTXQ71uhkxDKKDfdHWqKGURs/NZic3GcVF27VLrV2cvbBag+rT4etZIi+2fdFLZuBz1Vx4SCKARvvSaNGItOvK4qmBUA2fYpokNwCp22i8+nikmbl7diZv38ClAQa0qEz1O/LOH1YSrwTrR8Wc57IrP9F0ZGnj0H1CxAiWCn/AWgpwGGpf7IoRAXAWS36E9FQmJZOfkuEa1q/9WPvoIjfZocSDqhRrr41azCCEpB9EpGuqzXfZCu3FKRbRsk6145OC/NaXC1MgjiTyPipsapQV78emTCu7EKCONuwGcKmLYBQqrYuO0IG8OA4IPKprj1bK24p2EUyWQXqsXGP5tFoAnZV3ql0w/3Rd6kO8KZcpTOyv/erTWtIIkkmZKjv46OHVhiBWTXdP/rQMcloG4AHAnSnmE4pKcdh+QF2YO3V8rmsuSV8FJWXh+pCkZovjoSKnf3zqm0abYDzfyc55mjtFXD+7xMjMoD1jd8RFw/CzskPiYYCjwIPiKF10IO5A2LrwKer+0QDDzzIjiteOnZrzjWvAHtXyGsm1unzMZbVa0bwz+4xKBOl+LNdbK95ImNr6Ki2ow5FaWHrANmDf7aqiheZxxS7QuPSFpuLiIJ7ZbeHQ9XMrcZFD1YSafx2UZPzE9Jlbx3y06MA0dbqjC+d89CXVLeioqKioqKioqKioqId/QMCV6wi9YBqyAAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=407.a5a13d79.js.map