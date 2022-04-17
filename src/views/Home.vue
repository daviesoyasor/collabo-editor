<template>
  <v-container>
    <v-row>
      <v-col md="6" class="hidden-sm-and-down">
        <div class="welcome-image">
          <img :src="require('../assets/undraw_real_time_collaboration_c62i.svg')" alt="">
        </div>
      </v-col>
      <v-col md="6" sm="12">
          <div class="room-form">
            <div class="form-heading">
              <h3 class="form-title text-md-h3 text-sm-h5">Let's <span>Collabo</span></h3>
              <h4 class="text-md-h5"><span v-if="createRoom==true">Create</span> <span v-else>Join</span> Room</h4>
            </div>
            
            <div class="form-body" v-show="createRoom">
              <div class="input-field">
                <input type="text" placeholder="Room Id" v-model="roomId">
                <input type="text" placeholder="Username" v-model="username">
                <button class="room-btn" @click="createcollaboRoom()">Create Room</button>
              </div>
              <button class="create-room-btn" @click="showJoinRoom()">Join Room ?</button>
            </div>

            <div class="form-body" v-show="joinRoom">
              <div class="input-field">
                <input type="text" placeholder="Room Id" v-model="roomId">
                <input type="text" placeholder="Username" v-model="username">
                <button class="room-btn" @click="joincollaboRoom()">Join Room</button>
              </div>
              <button class="create-room-btn" @click="showCreateRoom()">Create Room ?</button>
            </div>

          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
    data: () => ({
      joinRoom: false,
      createRoom: true,
      roomId: null,
      username: null,
      socket: null,
  }),
  methods: {
    showJoinRoom(){
      this.joinRoom = true;
      this.createRoom = false;
    },
    showCreateRoom(){
      this.joinRoom = false;
      this.createRoom = true;
    },
    createcollaboRoom(){
      if(this.roomId == null || this.username == null){
        return
      }
      this.$router.push({path: '/room'})
      localStorage.setItem('user', JSON.stringify({roomId: this.roomId, username: this.username}))
    },
    joincollaboRoom(){
      if(this.roomId == null || this.username == null){
        return
      }
      this.$router.push({path: '/room'})
      localStorage.setItem('user', JSON.stringify({roomId: this.roomId, username: this.username}))
    },
  }
  }
</script>
<style scoped>
 .welcome-image img{
   width:100%;
   transform: translateY(50%);
 }
 .room-form{
   
   height: 100%;
   margin-top: 150px;
   padding: 10px 20px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }
 .room-form .form-heading{
   width: 100%;
   text-align: center;
   padding-top: 10px;

 }
 .room-form .form-heading .form-title{
   font-size: 30px;
   line-height: 5px;
   margin-bottom: 3px;
   padding: 20px 10px;
 }
 .form-body{
   margin-top: 30px;
   padding: 15px 25px;
 }
 .form-body .room-btn{
   background: #4F47C9;
   color: whitesmoke;
   border: 1px solid #4F47C9;
   padding: 10px 15px;
   margin-top: 10px;
   transition: background .6s ease;
   
 }
 .form-body .room-btn:hover{
   background: transparent;
 }
 .form-body input{
   border: 1px solid #4F47C9;
   margin-bottom: 10px;
   padding: 10px 15px;
   color: #fff;
 }
 .form-body input:focus{
   outline: none;
 }

 .create-room-btn{
    background: transparent;
    color: whitesmoke;
   margin-top: 10px;
 }
  .create-room-btn:hover{
    color: #4F47C9;
 }
 .input-field{
   display: flex;
   flex-direction: column;
   border: 1px solid #4F47C9;

   padding: 10px 20px;
   width: 300px;
   height: 100%;
   
 }
</style>


