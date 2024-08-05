import Vue from "vue";
import { BProgress } from 'bootstrap-vue'

export let vueMessages;

if (document.getElementById("vue-messages")) {
    vueMessages = new Vue({
        el: '#vue-messages',
        name: 'vue-messages',
        components: {
            BProgress,
        },
        data: function() {
            return{
                messages: [],
                socket: '',
                quantity: 0,
                reverse: false,
                error: null
            }
    },
    mounted(){
        const url = window.location.pathname.split('/')
        const id = url[url.length - 2]
        this.socket = new WebSocket('ws://127.0.0.1:8000/ws/get-messages/' + id + '/')
    
        this.socket.onopen = () => {
            this.socket.onmessage = ({data}) => {
                let new_data = JSON.parse(data)
                console.log(new_data);
                if (new_data.error){
                    this.error = new_data.error;
                }else{
                this.messages.push(new_data.result);
                this.quantity = new_data.quantity;
                }
            }
        }
    },
    methods: {
    },
    computed: {
        reversedMessages() {
            if (this.reverse){
                return [...this.messages].reverse();
            }
            return this.messages;
        },
    }})
}