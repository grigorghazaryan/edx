<template>
  <q-page class="q-pa-sm edx-background">  

    <!-- <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations"/>
        <q-breadcrumbs-el label="GEER"/>
      </q-breadcrumbs>
    </div> -->


    <AllocationBar :title="6" />
    <AllocationTable :title="6" />

  </q-page>
</template>

<script>
import AllocationBar from '../../components/allocation/AllocationBar';
import AllocationTable from '../../components/allocation/AllocationTable';

export default {
  components: {
    AllocationTable,
            AllocationBar
  }
}
</script>