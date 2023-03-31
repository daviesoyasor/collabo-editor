<template>
  <div>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
          <v-chip
            class="ma-2 shrink hidden-sm-and-down"
            color="success"
            outlined
            pill
            v-if="connected"
          >
            Connected
            <v-icon right>
              mdi-account-outline
            </v-icon>
          </v-chip>
            <v-chip
            class="ma-2 shrink hidden-sm-and-down"
            color="primary"
            outlined
            pill
            v-else
          >
            Disconnected
            <v-icon right>
              mdi-account-outline
            </v-icon>
          </v-chip>
      </div>
      <v-spacer></v-spacer>
      <div class="welcome-text">
        <h3 class="welcome">Let's Collabo</h3>
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
       
          <v-snackbar
            timeout="3000"
            v-model="showToast"
            absolute
            bottom
            color="success"
            outlined
            right
          >
            {{ msg }}
           </v-snackbar>

             <v-snackbar
            timeout="2000"
            v-model="showDisconnectToast"
            absolute
            bottom
            color="info"
            outlined
            right
          >
            {{ disconnectmsg }}
           </v-snackbar>

      <template v-slot:extension>
          <v-tabs v-model="active"  show-arrows color="indigo">
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab
            v-for="(file,i) in files"
            :key="i"
            @click="showFile(i)"
            v-on:dblclick="removeFile(i)"
          >
            {{ file.name }}
          </v-tab>
          </v-tabs>
      </template>
    </v-app-bar>


    <!-- Navigation Drawer -->
    <v-navigation-drawer
      app 
      v-model="drawer"
    >
      <template v-slot:prepend>
        <div>
          <div class="pa-2 indigo--text d-flex align-center justify-space-between">
            <h2>File Explorer</h2>
            <v-avatar color="indigo" size="36">
              <!-- when this icon is clicked call the newFile method which then set the addFile variable to true, which will display the form for adding the new file -->
              <v-icon @click="newFile">mdi-plus</v-icon>
            </v-avatar> 
          </div>
          <v-divider class="mt-3"></v-divider>
        </div>
      </template>


        <v-list>
          <!-- loop through the files array, and display the file names and use the extension to add the respective extension icon -->
          <v-list-item-group v-model="active" color="indigo">

            <!-- when the list item is clicked the showFile method will be called with the file index in the files array passed to it  -->
            <v-list-item v-for="(file, i) in files" :key="i"  @click="showFile(i)" v-on:dblclick="removeFile(i)">
              <v-list-item-icon>
                <v-icon >mdi-file</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title >{{file.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!--End when the list item is clicked the showFile method will be called with the file index in the files array passed to it  -->

          </v-list-item-group>
          <!-- loop through the files array, and display the file names and use the extension to add the respective extension icon -->

          <!-- field for new file, it is hidden by default but it will show when the addFile variable is true -->
          <v-list-item v-show="addFile"> 
            <v-list-item-content>
              <input style="border: none; outline: none; width: 24px; padding: 5px; color: #fff;  background: transparent; " maxlength="100" type="text" class="py-0 " ref="filename"
                @keyup.enter.prevent="createFile"
              v-model="filename">
            </v-list-item-content>
          </v-list-item>
      </v-list>

    
 
      <template v-slot:append>
        <div class="pa-2">
           <v-chip
            class="ma-2"
            color="success"
            outlined
            pill
            v-if="connected"
          >
            Connected
            <v-icon right>
              mdi-account-outline
            </v-icon>
          </v-chip>
            <v-chip
            class="ma-2"
            color="primary"
            outlined
            pill
            v-else
          >
            Disconnected
            <v-icon right>
              mdi-account-outline
            </v-icon>
          </v-chip>
        </div>
      </template>
    </v-navigation-drawer>
    <!--End Navigation Drawer -->
    
  <v-container fluid >
    <v-row>
      <v-col cols="12"  >
        <section id="editor">
          <textarea id="code" ></textarea> 
           <v-card-text style="height: 100px; position: relative; top: -60px; ">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  
                  <v-fab-transition>
                    <v-btn
                      color="indigo"
                      dark
                      absolute
                      top
                      right
                      fab
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="dialog = true"
                    >
                      <v-icon>mdi-account-group</v-icon>
                    </v-btn>
                  </v-fab-transition>
                </template>
                <span>Room users</span>
              </v-tooltip>
          </v-card-text>
        </section>   
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title><v-icon class="mr-1">mdi-account-group</v-icon>Connected Users</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="max-height: 400px;">
          <v-list>
            <!-- loop through the users array -->
            <v-list-item-group color="indigo">
              <v-list-item v-for="(user, i) in users" :key="i">
                <v-list-item-icon>
                  <v-icon >mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title >{{user.username}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="indigo darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
    
  </div>
    
</template>

<script>


export default {
  name: 'Room',

  components: {
   
  },

  data: () => ({
    drawer : false,
    addFile: false,
    filename: "",
    active: 0,
    editor: null,
    connected: false,
    echo: true,
    cursor: { ch: 0, line: 0 },
    socket: null,
    mode: "",
    user: null,
    roomId: null,
    dialog: false,
    username: null,
    showToast: false,
    showDisconnectToast: false,
    msg: "welcome",
    disconnectmsg: "welcome",
    users: [],
    files: [
      //an array of pages/files,their content, and the type of file (mode)  
    ],
  }),
   /* SOCKET */
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.roomId = user.roomId;
    this.username = user.username;
    // this.socket = io("https://code-blackboard.herokuapp.com/");
    // this.socket = io("http://localhost:5500/");
    this.socket = io("https://collabo-api.onrender.com");
      this.socket.on("connect", () => {
      this.connected = true;
      console.log(this.socket.id);
      });
    this.socket.emit("createjoinRoom", {roomId: this.roomId, username: this.username});

    this.socket.on("broadcast", (arg) => {
      // if (this.mirror) {
      //   this.active = arg.active;
      //   this.mode = arg.mode;
      // }

      this.files = [...arg.files];

    });

    this.socket.on("notifyRoom", (msg) => {
      this.msg = msg;
      this.showToast = true; 
    });
    this.socket.on("welcomeUser",(msg) =>{
      this.msg = msg;
      this.showToast = true;
    })

     this.socket.on("userdisconnect",(msg) =>{
      this.disconnectmsg = msg;
      this.showDisconnectToast = true;
    })

    this.socket.on("roomUsers", (userdata) => {
      this.users = userdata
    })
    
  },
  mounted() { 
    const textarea = document.querySelector("#code");
    this.editor = CodeMirror.fromTextArea(textarea, {
      mode: "text/x-c++src",
      lineWrapping: true,
      theme: "material-darker",
      tabSize: 2,
      lineNumbers: true,
      indentWithTabs: true,
      scrollbarStyle: null,
    });

    this.editor.on("change", (e,changeObj) => {
      this.cursor = {...this.editor.getCursor()};
      console.log(this.cursor)
      console.log(changeObj)
      if (this.echo) {
        this.files[this.active].content = this.editor.getValue();
        // socket
        this.socket.emit("emit", {
        files: this.files,
        active: this.active,
        mode: this.mode,
        cursor: this.cursor
      });
      // end of socket
      }
      this.echo = true;
    });
  },

  methods: {
    newFile() {
      //when the user clicks on the create new file image, set the addFile variable to true, which toggles the input field for adding the file name, and then make that input field to have focus.
      this.addFile = true;
      setTimeout(() => {
        this.$refs.filename.focus();
      }, 0);
    },

    createFile(){
      //create the file that is in the filename variable
      if (this.filename.length > 0) {
        let filename = this.filename;
        if (filename.includes(".")) {
          filename = filename.split(".");
          if (filename.length >= 2) {
            let ext = filename.pop();

            switch (ext) {
              case "c":
              case "cpp":
              case "java":
                this.mode = "text/x-c++src";
                break;

              case "py":
                this.mode = "python";
                break;

              case "md":
                this.mode = "markdown";
                break;

              case "sql":
                this.mode = "sql";
                break;

              case "sh":
                this.mode = "shell";
                break;

              case "jsx":
                this.mode = "jsx";
                break;

              case "html":
              case "htm":
                this.mode = "htmlmixed";
                break;

              case "xml":
                this.mode = "xml";
                break;

              case "js":
              case "json":
                this.mode = "javascript";
                break;

              case "php":
                this.mode = "php";
                break;

              default:
                this.mode = "";
                break;
            }
          }
        }
      
      }
      //add to files array
      this.files = [...this.files, { name: this.filename, content: "", mode: this.mode }];
      this.filename = "";

      // socket
      this.socket.emit("emit", {
        files: this.files,
        active: this.active,
        mode: this.mode,
        cursor: this.cursor
      });
      // end socket
      this.mode= "";
      this.addFile = false;
      
    },
    showFile(index){
      // set the file index to the current active file
      this.active = index;
      // set the current active file mode
      this.mode = this.files[this.active].mode;  
      // set the value of the editor to the content of the active file
      this.editor.setValue(this.files[this.active].content);
      // set the mode of the 
      this.editor.setOption("mode", this.mode);   
    },
    removeFile(index){
    this.files.splice(index, 1);
    // socket
      this.socket.emit("emit", {
        files: this.files,
        active: this.active,
        mode: this.mode,
        cursor: this.cursor
      });
      // end socket
    }
  },
  watch: {
     files() {
      this.echo = false;
      let cursorPosition = this.editor.getCursor();
      this.editor.setValue(this.files[this.active].content);
      this.editor.setCursor(cursorPosition);
    },
  }, 
  
};
</script>
<style>
.v-tab {
text-transform: none !important;
}
#editor {
  width: 100%;
  max-height: calc(100vh - 56px - 35px - 21px);
  height: 100vh;
  
}
/* #code {
  height: 100%;
} */
.CodeMirror.cm-s-material-darker {
  height: 100%;
}

.CodeMirror.cm-s-dracula {
  height: 100%;
}

.CodeMirror.cm-s-material-palenight {
  height: 100%;
}

.CodeMirror.cm-s-material-ocean {
  height: 100%;
}

.CodeMirror * {
  font-family: "Fira Code", monospace;
}
</style>
