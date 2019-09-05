/**
 * Created by Libing on 2019/8/23 15:37
 */
import {getStyle} from "../../config/utils";
import {imgBaseUrl} from "../../config/env";
import $ from 'jquery'

//触底加载更多
export const loadMore = {
    directives:{
        'load-more' : {
             bind:(el,binding)=>{
                 // console.log(el);
                 // console.log($(el));
                 let windowHeight = window.screen.height;
                 let height;
                 let setTop;
                 let paddingBottom ;
                 let marginBottom;
                 let requestFram;
                 let oldScrollTop;
                 let scrollEl;
                 let heightEl;
                 let scrollType = el.attributes.types && el.attributes.type.value;
                 let scrollTypeReduce =2 ;
                 if(scrollType ==2){
                     scrollEl = el;
                     heightEl = el.children[0];
                 }else {
                     scrollEl = document.body;
                     // scrollEl = el;
                     heightEl = el ;
                 }
                 el.addEventListener('touchstart',()=>{
                     height = heightEl.clientHeight;
                     if(scrollType==2){
                         height = height
                     }
                     setTop = el.offsetTop;
                     paddingBottom = getStyle(el , 'paddingBottom');
                     marginBottom = getStyle(el,'marginBottom');
                 },false);

                 el.addEventListener('touchmove',()=>{
                      loadMore();
                 },false)

                 el.addEventListener('touchend',()=>{
                     oldScrollTop = scrollEl.scrollTop;
                     moveEnd();
                 },false);

                 const moveEnd = ()=>{
                     requestFram = requestAnimationFrame(()=>{
                         if(scrollEl.scrollTop!=oldScrollTop){
                             oldScrollTop = scrollEl.scrollTop ;
                             moveEnd()
                         }else {
                             cancelAnimationFrame(requestFram);
                             height = heightEl.clientHeight;
                             loadMore();
                         }
                     })
                 };

                 const loadMore = () =>{
                     var lbscrollTop = scrollEl.scrollTop+windowHeight; //向上卷积高度加屏幕高度
                     console.log("执行加载更多");
                     if(lbscrollTop>= height + setTop + paddingBottom + marginBottom - scrollTypeReduce){
                          binding.value();
                     }
                 }
             }
        }
    }
};
