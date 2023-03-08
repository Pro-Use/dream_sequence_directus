<template>
    <div class="row">
        <div class="lg-left bg-light-blue">
            <input type="text" v-model="data.id" disabled>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <input type="textarea" v-model="data.description">
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <select type="textarea" v-model="data.device">
                <option value="uRad">uRad</option>
                <option value="waterMonitor">Water Monitor</option>
            </select>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <select type="textarea" v-model="data.dataPoint">
                <option value="o2">o2</option>
                <option value="temperature">Temperature</option>
            </select>
        </div>
        <div class="lg-center bg-light-blue">
            <input type="text" v-model="data.liveDataValue" disabled>
        </div>
        <div class="lg-center bg-light-blue">
            <input type="text" v-model="data.min" disabled>
        </div>
        <div class="lg-center bg-light-blue">
            <input type="text" v-model="data.max" disabled>
        </div>
        <div class="lg-span-2 lg-center bg-light-blue">
            <input type="text" v-model="data.liveOutpuValue" disabled>
        </div>
    </div>
</template>

<script setup>

let data = { 
        "id": 1, 
        "description": "Controls fog and water",
        "device": "uRad",
        "dataPoint": "o2",
        "liveDataValue": 1.234,
        "min": 0.1,
        "max": 1,
        "liveOutputValue": .823
    }; 
</script>

<style scoped>

</style>

