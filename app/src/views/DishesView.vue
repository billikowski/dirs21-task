<template>
  <div class="dishes">
    <v-container class="text-h4 font-weight-bold py-10"> Dishes </v-container>
    <v-spacer></v-spacer>
    <v-container class="px-3">
      <v-alert
        border="left"
        colored-border
        type="info"
        elevation="2"
        dismissable
      >
        <span>{{ helpText }}</span>
      </v-alert>
    </v-container>
    <v-container class="d-flex justify-space-between px-3">
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="elevation-2" v-bind="attrs" v-on="on">
            <v-icon left dark>mdi-plus</v-icon>
            Add dish
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <v-col cols="12" sm="7">
              <span>{{
                formTitle + (editedDish.name == null ? "" : editedDish.name)
              }}</span>
            </v-col>
            <v-col cols="12" sm="5">
              <v-checkbox
                v-model="editedDish.active"
                :label="
                  editedDish.active ? 'Marked as active' : 'Marked as inactive'
                "
              ></v-checkbox>
            </v-col>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-col>
                <v-text-field
                  v-model="editedDish.name"
                  :rules="[(v) => !!v || 'Name is required']"
                  label="Name"
                ></v-text-field>
                <v-text-field
                  v-model="editedDish.description"
                  :rules="[(v) => !!v || 'Description is required']"
                  label="Description"
                ></v-text-field>
                <v-row>
                  <v-col cols="4">
                    <v-select
                      v-model="editedDish.category"
                      :rules="[(v) => !!v || 'Category is required']"
                      :items="categories"
                      label="Category"
                      chips
                    ></v-select>
                  </v-col>
                  <v-col cols="8">
                    <!-- Multiple options can be selected to cover 
                    time of day as well as time of week -->
                    <v-select
                      v-model="editedDish.availability"
                      :rules="[(v) => !!v || 'Availability is required']"
                      :items="availabilities"
                      label="Availability"
                      multiple
                      chips
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      v-model="editedDish.price"
                      :rules="[
                        (v) => !!v || 'Price is required',
                        (v) => v >= 0 || 'Price cannot be negative',
                      ]"
                      label="Price"
                      prefix="EUR"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <!-- 60 is selected as realistic maximum wait time -->
                    <v-slider
                      class="px-0 mt-4"
                      v-model="editedDish.waitTime"
                      label="Wait time (min)"
                      step="5"
                      thumb-label="always"
                      max="60"
                    ></v-slider>
                  </v-col>
                </v-row>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn class="ml-5 mb-3" @click="closeDialog()">
              <v-icon left dark> mdi-close </v-icon>
              Cancel
            </v-btn>
            <!-- <v-btn @click="resetForm()">
              <v-icon left dark> mdi-backup-restore </v-icon>
              Reset
            </v-btn> -->
            <v-btn
              class="mr-5 mb-3"
              :disabled="!valid"
              color="success"
              @click="validateForm"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="elevation-2" color="error" @click="toggleClearDialog">
        <v-icon left dark>mdi-table-remove</v-icon>
        Delete all
      </v-btn>
    </v-container>
    <v-container class="align-center pa-3">
      <v-data-table
        :headers="headers"
        :items="dishes"
        :items-per-page="10"
        class="elevation-2"
        :search="search"
        show-group-by
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:[`item.price`]="{ item }">
          <span
            >{{
              Number(item.price).toLocaleString("en-GB", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}&nbsp;€</span
          >
        </template>
        <template v-slot:[`item.availability`]="{ item }">
          {{ item.availability.join(", ") }}
        </template>
        <template v-slot:[`item.active`]="{ item }">
          <v-btn
            small
            rounded
            depressed
            min-width="100px"
            :color="item.active ? 'green accent-2' : 'red accent-1'"
            v-model="isActive"
            @click="
              {
                toggleStatus(item);
              }
            "
          >
            {{ item.active ? "Active" : "Inactive" }}
          </v-btn>
        </template>
        <template v-slot:[`item.waitTime`]="{ item }">
          {{ item.waitTime }} min
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon @click="showDialog(item)" v-bind="attrs" v-on="on">
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit dish</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="showDeleteDialog(item)"
                color="red"
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete dish</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getDishes"> Reset </v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="deleteDialog" max-width="350px">
        <v-card>
          <v-card-title class="text-h5 mb-10"> Delete </v-card-title>
          <v-card-text class="font-weight-normal">
            Are you sure you want to delete this dish?
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn @click="closeDeleteDialog">
              <v-icon left dark> mdi-close </v-icon>
              Cancel
            </v-btn>
            <v-btn color="error" @click="deleteDish">
              <v-icon left dark> mdi-delete-forever </v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="clearDialog" max-width="350px">
        <v-card>
          <v-card-title class="text-h5 mb-10"> Delete all dishes </v-card-title>
          <v-card-text class="font-weight-normal">
            Are you sure you want to delete all entries?
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn @click="toggleClearDialog">
              <v-icon left dark> mdi-close </v-icon>
              Cancel
            </v-btn>
            <v-btn color="error" @click="clearDishes">
              <v-icon left dark> mdi-delete-forever </v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import DishService from "@/services/dish_service.js";

export default {
  name: "Dishes",
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      clearDialog: false,
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
          groupable: false,
        },
        {
          text: "Description",
          value: "description",
          groupable: false,
        },
        {
          text: "Price",
          value: "price",
          groupable: false,
        },
        {
          text: "Category",
          value: "category",
          groupable: true,
        },
        {
          text: "Availability",
          value: "availability",
          groupable: false,
        },
        {
          text: "Status",
          value: "active",
          groupable: true,
        },
        {
          text: "Wait time",
          value: "waitTime",
          groupable: false,
        },
        {
          text: "Actions",
          value: "actions",
          groupable: false,
        },
      ],
      categories: [
        "Starter",
        "Main Course",
        "Side Item",
        "Dessert",
        "Beverage",
      ],
      availabilities: ["Breakfast", "Lunch", "Dinner", "Weekdays", "Weekend"],
      dishes: [],
      editedIndex: -1,
      editedDish: {
        name: "",
        description: "",
        price: 0,
        category: "",
        availablity: [],
        active: true,
        waitTime: 0,
      },
      defaultDish: {
        name: "",
        description: "",
        price: 0,
        category: "",
        availablity: [],
        active: true,
        waitTime: 0,
      },
      isActive: true,
      valid: true,
      helpText:
        "Use this page to add new dishes, modify existing dishes " +
        "or delete dishes.",
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 2000,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New " : "Edit ";
    },
  },

  created() {
    this.getDishes();
  },

  methods: {
    async getDishes() {
      const response = await DishService.getDishes();
      this.dishes = response.data.data;
    },

    async putDish(item) {
      await DishService.putDish(item);
      this.snackbarText = "Dish has been saved";
      this.snackbar = true;
      this.getDishes();
    },

    async deleteDish() {
      await DishService.deleteDish(this.editedDish._id);
      this.closeDeleteDialog();
      this.snackbarText = "Dish has been removed";
      this.snackbar = true;
      this.getDishes();
    },

    async clearDishes() {
      await DishService.clearDishes();
      this.clearDialog = false;
      this.snackbarText = "Dishes have been removed";
      this.snackbar = true;
      this.getDishes();
    },

    showDialog(item) {
      this.editedIndex = this.dishes.indexOf(item);
      this.editedDish = Object.assign({}, item);
      this.dialog = true;
    },

    showDeleteDialog(item) {
      this.editedIndex = this.dishes.indexOf(item);
      this.editedDish = Object.assign({}, item);
      this.deleteDialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedDish = Object.assign({}, this.defaultDish);
        this.editedIndex = -1;
      });
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultDish);
        this.editedIndex = -1;
      });
    },

    toggleClearDialog() {
      this.clearDialog = !this.clearDialog;
    },

    toggleStatus(item) {
      this.editedDish = item;
      this.editedDish.active = !this.editedDish.active;
      this.putDish(this.editedDish);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedDish);
      } else {
        this.putDish(this.editedDish);
      }
      this.closeDialog();
    },

    validateForm() {
      if (this.$refs.form.validate()) {
        if (this.editedDish.availability == undefined) {
          this.editedDish.availability = [];
        }
        this.putDish(this.editedDish);
        this.dialog = false;
      }
    },
  },
};
</script>
