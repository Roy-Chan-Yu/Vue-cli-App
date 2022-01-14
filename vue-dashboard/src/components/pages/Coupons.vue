<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠卷
      </button>
    </div>

    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">標題:</label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="請輸入標題"
              />
            </div>

            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                id="coupon_code"
                class="form-control"
                placeholder="請輸入優惠碼"
              />
            </div>

            <div class="form-group">
              <label for="price"> 折扣百分比 </label>
              <input type="number" id="price" placeholder="請輸入折扣百分比" />
            </div>

            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label for="is_enabled" class="form-check-label"
                  >是否啟用</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠卷</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: "",
      },
      due_date: new Date(),
      isNew: false,
      isLoading: false,
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    openCouponModal(isNew, item) {
      const vm = this;
      $("#couponModal").modal("show");

      vm.isNew = isNew;

      if (vm.isNew) {
        this.tempCoupon = {};
      } else {
        vm.tempCoupon = Object.assign({}, item);
        const dateTime = new Date(vm.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");
        vm.due_date = dateTime[0];
      }
    },
    getCoupons() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;

      this.$http.get(url).then((response) => {
        vm.coupons = response.data.coupons;
        console.log(response);
      });
    },
    updateCoupon() {
      const vm = this;
      if (vm.isNew) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        this.$http.post(url, {data: vm.tempCoupon} ).then((response) => {
          console.log(response, vm.tempCoupon);
          $('#couponModal').modal('hide');
          this.getCoupons();
        })
      } else {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);

        this.$http.put(url, {data: vm.tempCoupon}).then((response) => {
          console.log(response);
          $('#couponModal').modal('hide');
          this.getCoupons();
        });
      }
    }
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
};
</script>