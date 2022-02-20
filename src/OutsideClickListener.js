import { useEffect,} from 'react';
import { useDispatch} from 'react-redux';
import { changeNameWindowState, changeNameWindowStyles } from './counterSlice';
import { store } from './store';

export default function OutsideClickListener(ref) {
  const dispatch = useDispatch();

     useEffect(() => {

        function HandleClickOutside(event) {

          if(store.getState().counter.isNameWindowActive===true){
          if (ref.current && !ref.current.contains(event.target)) {
            dispatch(changeNameWindowStyles({
              animation:'slide-out .3s forwards',
             }))
             dispatch(changeNameWindowState(false));
            
          }
         }
        }
        // Bind the event listener
        document.addEventListener("mousedown", HandleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", HandleClickOutside);
        };
      }, [ref]);
  }