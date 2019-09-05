// 存储localStorage
export const setStorage = (name, value) => {
    if (!name) return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value);
};

// 获取localStorage
export const getStorage = (name) => {
    if (!name) return;
    return window.localStorage.getItem(name)
};

//删除localStorage
export const removeStorage = (name) => {
    if (!name) return;
    window.localStorage.removeItem(name);

};
/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int')=>{
    let target ;
    //scrollTop 获取仿式不同，
    if(attr == "scrollTop"){
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    //在获取opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
};


/**
 * 显示返回顶部按钮 开始、结束、运动 三个过程中调用函数判断是否达到了目标点
 */
export const showBack = callback =>{
  let requestFram ;
  let oldScrollTop;
  document.addEventListener('scroll',()=>{
    showBackFun();
  },false);
  document.addEventListener('touchstart',()=>{
    showBackFun()
  },{passive:true});

  document.addEventListener('touchmove',() => {
    showBackFun();
  },{passive: true});

  document.addEventListener('touchend',()=>{
     oldScrollTop = document.body.scrollTop;
     moveEnd();
  },{passive:true});

  const moveEnd = () =>{
      requestFram = requestAnimationFrame(() => {
        if (document.body.scrollTop != oldScrollTop) {
          oldScrollTop = document.body.scrollTop;
          moveEnd();
        }else{
          cancelAnimationFrame(requestFram);
        }
        showBackFun();
      })
  };

  //判断是否达到目标点
  const showBackFun = ()=>{
    if(document.body.scrollTop>500){
        callback(true)
    }else {
        callback(false)
    }
  }
};

