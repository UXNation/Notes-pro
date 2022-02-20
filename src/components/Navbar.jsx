import React from 'react';
import {useEffect} from 'react';
import { connect, useDispatch,useSelector } from 'react-redux';
import {changeCurrentWidth,changeCurrentMargin,changeNavbarIndex,updateSearchPlaceHolder, updateFilteredArray} from '../counterSlice';

var mapStateToProps;

const changeValue = () => {
  return {
    type:'setValue',
    payload:'10'
  }
}
var navItems = [
     'All',
     'Favourites',
     'Important',
];

var activeIndex = [
  true,
  false,
  false,
]

var CONTAINER_PADDING_HALF = "1em";
var pointer;
var links;
var i=1;

 function Navbar(){
  const dispatch = useDispatch();
  const refs = React.useRef([]);
  const navbarIndex = useSelector(state=>state.counter.navbarIndex);

  //FOR USING HOOKS ----------------------------
  // const [width, setwidth]= useState(73.5);
  // const [leftMargin, setleftMargin] = useState(0);
  const currentWidth = useSelector((state)=>state.counter.width);
  const currentLeftMargin = useSelector((state)=>state.counter.leftMargin);

  useEffect(()=>{
      // refs.current = setwidth(refs.current.offsetWidth);
      //  console.log(width);
      console.log("current index: "+ currentWidth);
      // dispatch(changeValue());
      // console.log(value);      
  });

  useEffect(()=>{
    console.log(navbarIndex)
    switch(navbarIndex){
     case 0:
       dispatch(updateFilteredArray({type:"init"}))
       dispatch(updateSearchPlaceHolder(""));
       break;
     case 1:
       dispatch(updateFilteredArray({type:"fav"}))
       dispatch(updateSearchPlaceHolder("favourite "));
       break;
     case 2:
       dispatch(updateFilteredArray({type:"imp"}))
       dispatch(updateSearchPlaceHolder("important "));
       break;
     default:
       dispatch(updateFilteredArray({type:"init"}))  
      }
  },[navbarIndex])

  function calcLeftMargin(index){
     var margin = 0;
     for(i=0; i<index;i++){
      margin = refs.current[i].offsetWidth + margin;
     }
     return margin;
  }

     
     return (
       <div className="navbar">
           <div style={{width:currentWidth, left: currentLeftMargin }} className="nav__pointer" id="js-pointer"></div>
           <ul className="nav__list">
             {
                 
                    navItems.map((navItem, index)=>{  
                
                      return (<li className={activeIndex[index]===true?"active-item":null}
                       ref={
                       el => refs.current[index] = el
                      }
                      key={i++}
                      onClick={(e)=>{
                       // CHANGING WIDTH AND INDEX WITH HOOKS --------------
                       // setwidth(refs.current[index].offsetWidth);
                       // console.log(calcLeftMargin(index));
                       // setleftMargin(calcLeftMargin(index));
                      
                       //CHANGING WIDTH AND INDEX WITH REDUX -----------------
                        dispatch(
                         changeCurrentWidth(
                            refs.current[index].offsetWidth,
                            // calcLeftMargin(index)
                            )
                        );    
                        dispatch(changeCurrentMargin(calcLeftMargin(index)));      
                        activeIndex[activeIndex.indexOf(true)]=false;
                        activeIndex[index]=true;  
                        dispatch(changeNavbarIndex(index));                    
                       // console.log(refs.current[index].offsetWidth);

                      }}
                      >{navItem}</li>);   
                      
                   }
                  )                                                         
             }                    
           </ul>
             
         </div>
        
      );

     
   
   }

    
export default connect(mapStateToProps)(Navbar);