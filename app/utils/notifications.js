import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * 
 * @param {string} status 'success', 'neutral' or 'error'
 * @param {string} message 'message you want to display'
 * @returns {number} - The ID of the toast
*/

const notify = (status, message) => {
  if(status === 'success') {
    return toast.success(message, { autoClose: 5000 });
  } else if(status === 'error') {
    return toast.error(message, { autoClose: 5000 });
  }else if(status === 'neutral'){
    return toast(message, { autoClose: 5000 });
  }
}

export default notify;