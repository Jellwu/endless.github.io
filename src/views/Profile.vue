<template>
  <div>
    <div class="about-banner d-flex align-items-center justify-content-center">
      <div>
        <h1 class="text-endless">關於作者</h1>
      </div>
    </div>
    <div class="container bg-opacity my-5" style="width:1180px;">
      <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <!-- header -->
      <div class="header d-flex justify-content-center">
        <div class="col-md-7 text-endless d-flex flex-column justify-content-end align-items-center" style="bottom:-65px;">
          <div class="profil-img d-flex flex-column align-items-center">
            <img src="./view-img/profileImg.jpg" alt="...">
            <h5 class="pt-3">吳哲宇</h5>
            <span class="text-warning pt-1">Web developer</span>
          </div>
        </div>
        <div class="col-md-4 text-endless d-flex flex-column justify-content-center">
          <ul class="p-0">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>Kaohsiung</span>
            </li>
            <li>
              <i class="far fa-envelope"></i>
              <span>Jell9916@gmail.com</span>
            </li>
            <li>
              <i class="fab fa-github"></i>
              <span>Jellwu</span>
            </li>
          </ul>
        </div>
      </div>
       <!-- content-skill -->
      <div class="skill rounded">
        <h3 class="pt-5 text-endless border-skill ml-3">
          <span class="bg-skill-text">Morden Web Skill</span>
        </h3>
        <div class="row text-white py-5 justify-content-around">
          <div class="col-md-3 d-flex justify-content-center shadow-1 my-4">
            <div class="mt-3">
              <div class="d-flex justify-content-center mb-4">
                <img src="./view-img/img-skill-icon-1.png" alt="..." style="width:100px;">
              </div>
              <h4 class="text-center">Web Layout Design</h4>
              <ul class="text-endless mt-3">
                <li>HTML+CSS</li>
                <li>BootStrap4</li>
                <li>Sass/Scss</li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 d-flex justify-content-center shadow-2 my-4">
            <div class="mt-3">
              <div class="d-flex justify-content-center mb-4">
                <img src="./view-img/img-skill-icon-3.png" alt="..." style="width:100px;">
              </div>
              <h4 class="text-center">Web developer</h4>
              <ul class="text-endless mt-3">
                <li>JavaScript</li>
                <li>JQuary</li>
                <li>AJAX / JSON</li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 d-flex justify-content-center shadow-3 my-4">
            <div class="mt-3">
              <div class="d-flex justify-content-center mb-4">
                <img src="./view-img/img-skill-icon-2.png" alt="..." style="width:100px;">
              </div>
              <h4 class="text-center">Dev Helper</h4>
              <ul class="text-endless mt-3">
                <li>Git / Github</li>
                <li>Vue.js</li>
                <li>Vue Cli3 / Vuex</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- content works -->
      <div class="works rounded text-endless my-5">
        <div class="d-flex justify-content-end mr-3">
          <h3 class="text-right pt-2 text-endless border-works">
            <span class="bg-work-text">Core skills Learning</span>
          </h3>
        </div>
        <div class="row d-flex flex-column align-items-center">
          <div class="col-11 my-5 bg-opacity shadow">
            <div class="row d-flex works-1 p-2">
              <div class="col-5">
                <div class="pic-1">
                </div>
              </div>
              <div class="col-7 textArea">
                  <p>HTML/CSS+FLEX 網頁排版</p>
                <span>
                  完成六角學院「HTML / CSS」、「Flex」排版的相關課程，Flex排版的精神時光屋也提交任務，熟稔基礎HTML架構與CSS相關排版，
                  對於Flex的排版方式也不斷的精進，針對此技能有一定的程度，期望碰到夥伴能彼此切磋更多不同的經驗。
                </span>
              </div>
            </div>
          </div>
          <div class="col-11 my-3 shadow p-2">
            <div class="row d-flex flex-row-reverse works-2">
              <div class="col-5">
                <div class="pic-2">
                </div>
              </div>
              <div class="col-7 textArea">
                <p>BootStrap4/Sass/Scss 網頁切版</p>
                <span>
                  完成六角學院「Bootstrap 4」、「Sass/Scss」的相關課程，針對課程也完成最終作業，針對RWD的邏輯與內容有一定的認知；網頁
                  開發也以Bootstrap的排版工具為主，利用BootStrap與Fontawsome達成畫面的設計。
                </span>
              </div>
            </div>
          </div>
          <div class="col-11 mt-3 mb-5 shadow p-2">
            <div class="row d-flex works-3">
              <div class="col-5">
                <div class="pic-3">
                </div>
              </div>
              <div class="col-7 textArea">
                <p>Vue.js / VueCli3 / Vuex</p>
                <span>
                  完成六角學院「Vue出一個電商」、「Vuex架構撰寫電商網頁」架站的相關課程，此網站即是以Vuex框架作為開發架構，針對此塊內容還在
                  持續精進；希望能更了解前端最新的知識，由於前端相關技術的版本不斷更新，在撰寫此網站時已經很習慣用google或相關技術論壇去
                  解決問題，持續吸收更多新知。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- content About -->
      <div class="about">
        <div class="d-flex justify-content-center mr-3">
          <h3 class="text-center pt-2 text-endless border-about">
            <span class="bg-about-text">About 吳哲宇 / Jell</span>
          </h3>
        </div>
        <div class="row d-flex justify-content-center text-endless py-5">
          <div class="col-md-4 mr-5">
            <img src="https://i.imgur.com/3w2Ae46.jpg" alt="..." style="height:450px;">
          </div>
          <div class="col-md-6">
            <div class="pb-3">
              Hi，我是哲宇，目前居住在高雄市，<br>
              於民國102年畢業「國立高雄第一科技大學/高雄科技大學 - 資訊管理系」
            </div>
            <div  class="pb-3" style="text-indent:3rem">
              <span>
                先前都在資訊相關的領域工作，工作經歷絕大部分都是工程師，也碰過許多相關的工具 - 第一、二份工作就接觸MS-SQL的領域多一些，
                對MS-SQL相關的架構與語法還算了解，也在先前的工作的領域上應用；在第三份工作除了有用到MS-SQL去替客戶解決問題外，也接觸了Linux
                ，雖然沒有學過Linux的課程，但因為工作的關係與同事的幫忙，對於Linux的架構與指令也算是略知一二，碰到困難時，去看技術文件或是
                搜尋相關的技術也算蠻常發生的事，也蠻習慣這樣去找答案，但由於先前任職的公司都並非開發端，所以覺得自己開發的能力很有限，因此感到了危機。
              </span>
            </div>
            <div style="text-indent:3rem">
              <span>
                在離職前就不斷問自己能力在哪，有什麼可以在社會上立足的技術？有，但都不扎實，因此想趁沒有工作這段時間，好好加強自己的能力；
                算是幸運的找到了「六角學院」，扎實從頭的學習前端工程師的相關技術，目前已經能力用Vue的框架將網頁架設出來了，我想針對提出的設計稿，
                應是都有能力寫出來，自知自己能力還不足，但如果有機會，是會讓自己更努力去吸收的。
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// @ is an alias to /src
export default {
  name: 'LOGIN',
data(){
  return{

  }
},
methods:{

},
computed:{
  ...mapGetters('loginModules',['isLoading']),
  // cart(){
  //   return this.$store.state.cart;
  // }
},
}
</script>
<style scope>
.about-banner {
  background-image: url('https://images.unsplash.com/photo-1423479185712-25d4a4fe1006?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 300px;
}
.bg-opacity{
  background-color:rgba(0,0,0,0.1);
}
.header{
  height:350px;
}
.header li{
  margin:20px 0px;
}
.header li i{
  font-size:30px;
  padding-right:20px;
}
.header .profil-img img{
  border-radius: 50%;
  width:200px;
  height:200px;
}
.skill{
  margin:50px 0px 100px 0px;;
}
.skill p{
font-size:18px;
}
.skill ul,.skill ul li{
  list-style: circle;
  padding:0px;
}
.bg-skill-text{
  padding:8px 12px 0px 12px;
  background-color: #9BB5BF;
  color:#262626;
  border-radius: 5px 5px 0px 0px;
}
.border-skill{
  border-bottom: 4px solid #9BB5BF;
  width:85%;
}
.skill .shadow-1{
  box-shadow:.5rem .7rem 0.4rem rgba(245,141,35, .35)
}
.skill .shadow-2{
  box-shadow:.5rem .7rem 0.4rem rgba(103,98,166, .35)
}
.skill .shadow-3{
  box-shadow:.5rem .7rem 0.4rem rgba(84,161,70, .35)
}
.works .pic-1,.works .pic-2,.works .pic-3{
  border-radius: 10px;
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
  height:250px;
  margin:20px 0px;
}
.bg-work-text{
  padding:8px 12px 0px 12px;
  background-color: #8FB18C;
  color:#262626;
  border-radius: 5px 5px 0px 0px;
}
.border-works{
  border-bottom: 4px solid #8FB18C;
  width:85%;
}
.works .pic-1{
  background-image: url('https://i.imgur.com/oIwYp6l.png');
}
.works .pic-2{
  background-image: url('https://i.imgur.com/ZWEoFVo.png');
}
.works .pic-3{
  background-image: url('https://i.imgur.com/0mEYIJR.png');
}
.works .textArea p{
  font-size:24px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 10px;
}
.works-1 .textArea p:after{
  content: "";
  width: 50%;
  height: 10px;
  position: absolute;
  top: 22px;
  left: 30px;
  background-color: rgba(242, 202, 82,.6);
}
.works-2 .textArea p:after{
  content: "";
  width: 58%;
  height: 10px;
  position: absolute;
  top: 22px;
  left: 32px;
  background-color: rgba(242, 202, 82,.6);
}
.works-3 .textArea p:after{
  content: "";
  width: 42%;
  height: 10px;
  position: absolute;
  top: 22px;
  left: 32px;
  background-color: rgba(242, 202, 82,.6);
}
.works .textArea span{
  font-size:18px;
  font-weight: bold;
  padding-left: 10px;
  margin: 0px 15px;
}
.about img{
  border-radius: 5px;
}
.bg-about-text{
  padding:8px 12px 0px 12px;
  background-color: #CAC34E;
  color:#262626;
  border-radius: 5px 5px 0px 0px;
}
.border-about{
  border-bottom: 4px solid #CAC34E;
  width:85%;
}


</style>
