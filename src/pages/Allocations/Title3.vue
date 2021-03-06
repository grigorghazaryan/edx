<template>
  <q-page class="q-pa-sm">

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations" />
        <q-breadcrumbs-el label="Title III" />
      </q-breadcrumbs>
    </div>

    <AllocationBar :title="3" />
    <AllocationTable :title="3" />

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