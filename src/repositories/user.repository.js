const User = require('../model/user');
const mongoose = require('mongoose');
const Tweet = require('../model/tweet');

const userRepository = {
  saveUser: (userObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.create(userObj);
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  login: (userObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne(userObj, { password: 0 });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },


  getAdminByEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ email: email });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getAdmin: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({});
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  updatePassword: (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOneAndUpdate({ password: password });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  addFollower : ( followerId , user_Id ) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log( '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6' );
        console.log( followerId , 'followerId' , user_Id , 'user_Id'  );
        console.log( '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6' );
        let user = await User.findByIdAndUpdate({ _id : user_Id } , { $push : { following  : followerId } });
        let following_user = await User.findByIdAndUpdate({ _id : followerId } , { $push : { followers  : user_Id } });
        resolve({user , following_user});
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  removeFollower : ( followerId , user_Id ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = ['' , ''];
        let user = await User.findById({ _id : user_Id } , { following : 1 });
        let following = user.following;
        let index = following.indexOf(followerId);
        if(index != -1)
        {
          following = following.splice( index , 1 );

          res[0] = await User.findByIdAndUpdate({ _id : user_Id } , { $set : { following  : following } });
        }

        let following_user = await User.findById({ _id : followerId } , { followers : 1 });
        let followers = following_user.followers;
        let user_index = followers.indexOf(user_Id);
        if(index != -1)
        {
          followers = followers.splice( user_index , 1 );

          res[1] = await User.findByIdAndUpdate({ _id : user_Id } , { $set : { followers  : followers } });
        }
        resolve(res);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getUsersToFollow : ( userId ) => {
    return new Promise(async (resolve, reject) => {
      try {
      let arr =  [ mongoose.Types.ObjectId(userId) ];

      let users_to_follow =  await  User.aggregate([
          {
            $addFields: {
              "isFollower": {
                $in: [
                  userId ,
                  "$followers"
                ]
              }
            }
          },
          {
            $addFields: {
              "isHimseft": {
                $in: [
                  "$_id" ,
                  arr
                ]
              }
            }
          },
          {
            "$match": {
              isFollower: false
            }
          },
          {
            "$match": {
              isHimseft: false
            }
          }
        ])

        resolve(users_to_follow);

      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getPosts : ( user_id ) => {
    return new Promise(async (resolve, reject) => {
      try {
      let userId = mongoose.Types.ObjectId(user_id)
 
      let user = await User.findById({ _id : userId } , { following : 1 });    
      let following = user.following;
      following.push( userId );

        let Tweets = await Tweet.aggregate([
          {
            $addFields: {
              "isAllowed": {
                $in: [
                  "$user_Id",
                  following
                ]
              }
            },
          },
          {
            "$match": {
              isAllowed: true
            }
          }
        ])
        // console.log( Tweets , 'Tweets' );
        resolve(Tweets);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
 
};

module.exports = userRepository;
