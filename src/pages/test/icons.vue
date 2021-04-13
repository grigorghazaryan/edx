<template>
    <div class="q-mt-lg">

        <EdxIcons width="50px" height="50px" icon-name="Robot" :iconColor="'var(--info)'">
            <IconRobot />
        </EdxIcons>

        <EdxIcons 
            width="150px" 
            height="150px" 
            icon-name="Robot" 
            :iconColor="'var(--indigo)'">
                <IconRobot />
        </EdxIcons>
        <EdxIcons 
            width="250px" 
            height="250px" 
            icon-name="Robot" 
            :iconColor="'var(--success)'">
                <IconRobot />
        </EdxIcons>
        <EdxIcons 
            width="350px" 
            height="350px" 
            icon-name="Robot" 
            :iconColor="'var(--pink)'">
                <IconRobot />
        </EdxIcons>

    </div>
</template>

<script>

import EdxIcons from '../../components/edxIconPack/icon.vue';
///////////// ICONS
import IconRobot from '../../components/edxIconPack/icons/robot.vue'
import IconUser from '../../components/edxIconPack/icons/user.vue'


export default {
    components: {
        EdxIcons,
        // ICONS
        IconRobot,
        IconUser,
        IconUser1,
        IconPaid
    }
}

</script>