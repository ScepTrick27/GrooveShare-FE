import axios from 'axios';

const hostname = 'http://localhost:8080'

const LikeService = {
    likePost: async (userId, postId) => {
      try {
        const response = await axios.post(`${hostname}/likes/like`, { userId, postId });
        return response.data;
      } catch (error) {
        console.error('Error liking post:', error);
        throw error;
      }
    },
  
    unlikePost: async (userId, postId) => {
      try {
        const response = await axios.post(`${hostname}/likes/unlike`, { userId, postId });
        return response.data;
      } catch (error) {
        console.error('Error unliking post:', error);
        throw error;
      }
    },
  
    hasUserLikedPost: async (userId, postId) => {
        try {
          console.log('Making request to check if liked:', { userId, postId });
      
          const response = await axios.get(`${hostname}/likes/hasLiked`, {
            params: { userId, postId }
          });
      
          console.log('Response received:', response.data);
      
          return response.data;
        } catch (error) {
          console.error('Error checking if liked:', error);
          throw error;
        }
      }
  };
  
  export default LikeService;