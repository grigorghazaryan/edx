<template>
  <q-page class="q-pa-sm edx-background">

    <!-- <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations" />
        <q-breadcrumbs-el label="Title IV" />
      </q-breadcrumbs>
    </div> -->


    <AllocationBar :title="4" />
    <AllocationTable :title="4" />

  </q-page>
</template>

<script>
import AllocationTable from '../../components/allocation/AllocationTable';
import AllocationBar from '../../components/allocation/AllocationBar';

export default {
  components: {
    AllocationTable,
    AllocationBar
  }
}
</script>