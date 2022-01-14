<template>
    <div>
       
<Navbar />
<Alert></Alert>
<div class="container-fluid">
  <div class="row">
    <Sidebar></Sidebar>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <router-view></router-view>
    </main>
  </div>
</div>
    </div>
</template>

<script>
import Sidebar from './sidebar.vue'
import Navbar from './navbar.vue'
import Alert from './AlertMessage.vue'

    export default {
        components: {
            Sidebar,
            Navbar,
            Alert
        }
    }
</script>