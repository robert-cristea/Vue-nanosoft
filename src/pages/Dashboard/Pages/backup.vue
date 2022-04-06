<template>
  <div>
    <!----------  form ------------->

    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver id="#content">
          <form>
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-green">
                <div class="card-text">
                  <h4 class="title">Ticket page</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label
                    class="md-layout-item md-size-20 md-form-label"
                  ></label>
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider name="Name" rules="required">
                      <md-button class="md-success" @click="pdf"
                        >Generate report</md-button
                      >
                    </ValidationProvider>
                    <label
                      class="md-layout-item md-size-20 md-form-label"
                    ></label>
                    <div class="md-layout-item md-size-40">
                      <ValidationProvider name="Name" rules="required">
                        <a
                          class="md-success"
                          v-if="Url !== ''"
                          target="_blank"
                          :href="Url"
                          >Show report</a
                        >
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Ticket number</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Name"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input
                          type="text"
                          v-model="Ticketnumber"
                          disabled
                        ></md-input>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >From:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Name"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input
                          disabled
                          type="text"
                          v-model="From"
                        ></md-input>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Phone:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Name"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input
                          disabled
                          type="text"
                          v-model="Phone"
                        ></md-input>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Title</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Name"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-input type="text" v-model="Title"></md-input>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Severity</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Severity"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-select
                          v-model="Severity"
                          name="Severity"
                          id="Severity"
                        >
                          <md-option value="High">High</md-option>
                          <md-option value="Medium">Medium</md-option>
                          <md-option value="Low">Low</md-option>
                        </md-select>
                        <slide-y-down-transition>
                          <md-icon class="error m" v-show="failed"
                            >close</md-icon
                          >
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success m" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Categories</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Catagories"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-select
                          v-model="Catagory"
                          name="Catagories"
                          id="Catagories"
                        >
                          <md-option
                            v-for="category in data.categories"
                            v-bind:key="category._id"
                            :value="category._id"
                            >{{ category.Name }}</md-option
                          >
                        </md-select>
                        <slide-y-down-transition>
                          <md-icon class="error m" v-show="failed"
                            >close</md-icon
                          >
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success m" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Incident Severity</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Impact"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-select v-model="Impact" name="Impact" id="Impact">
                          <md-option
                            v-for="impact in data.impacts"
                            v-bind:key="impact._id"
                            :value="impact._id"
                            >{{ impact.Name }}</md-option
                          >
                        </md-select>
                        <slide-y-down-transition>
                          <md-icon class="error m" v-show="failed"
                            >close</md-icon
                          >
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success m" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Status</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Severity"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-select v-model="Status" name="Status" id="Status">
                          <md-option value="Registered">Registered</md-option>
                          <md-option value="Waiting">Waiting</md-option>
                          <md-option value="In-Progress">In-Progress</md-option>
                          <md-option value="Answered">Answered</md-option>
                          <md-option value="Closed">Closed</md-option>
                        </md-select>
                        <slide-y-down-transition>
                          <md-icon class="error m" v-show="failed"
                            >close</md-icon
                          >
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success m" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Descrption</label
                  >
                  <div class="md-layout-item md-size-40">
                    <ValidationProvider
                      name="Descrption"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed }
                        ]"
                      >
                        <md-textarea
                          v-model="Descrption"
                          type="text"
                        ></md-textarea>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Internal answer</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModalintarnal = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Formal answer</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModalformal = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>
              </md-card-content>
              <md-card-actions class="text-center">
                <md-button @click="submit" class="md-success">Save</md-button>
                <md-button
                  v-if="role === 'Admin'"
                  @click="
                    showModal = true;
                    getAssegned();
                  "
                  class="md-info"
                  >Assign</md-button
                >
              </md-card-actions>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver id="#content">
          <form>
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-green">
                <div class="card-text">
                  <h4 class="title">Incident details</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Source:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button @click="showModalsorce = true" class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Destination:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModaldestnation = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Incident Analysis:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModalIncidentAnalysis = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Impact Analysis:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModalImpactAnalysis = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Containment Actions:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModalContainmentActions = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label"
                    >Recommendation:</label
                  >
                  <div class="md-layout-item md-size-40">
                    <md-button
                      @click="showModalRecommendation = true"
                      class="md-success"
                      >Show</md-button
                    >
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver id="#content">
          <form>
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-green">
                <div class="card-text">
                  <h4 class="title">Date</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <el-table :data="[{ name: 3 }]" height="250">
                  <el-table-column label="Create date">{{
                    convert(data.ticket.createdAt)
                  }}</el-table-column>
                  <el-table-column prop label="Last update">{{
                    convert(data.ticket.updatedAt)
                  }}</el-table-column>
                  <el-table-column prop label="Assigne date">{{
                    convert(data.ticket.AssignedAt)
                  }}</el-table-column>
                  <el-table-column prop label="Answer date ">{{
                    convert(data.ticket.AnswerDate)
                  }}</el-table-column>
                  <el-table-column prop label="Close date">{{
                    convert(data.ticket.ClosedAt)
                  }}</el-table-column>
                </el-table>
              </md-card-content>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <ValidationObserver id="#content">
          <form>
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-green">
                <div class="card-text">
                  <h4 class="title">Files</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <el-table :data="[{ id: '' }]" height="250">
                  <el-table-column label="file Name">
                    <a
                      target="_blank"
                      :href="Origin + 'images/TicktImages/' + data.ticket.Image"
                      >{{ data.ticket.Image.slice(0, 24) }}...</a
                    >
                  </el-table-column>
                </el-table>
              </md-card-content>
            </md-card>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div id="app">
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Assign to engneeiers</h3>
        <div slot="body">
          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">id</label>
            <div class="md-layout-item md-size-50">
              <ValidationProvider
                name="SystemVersion"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="SystemVersion" type="number"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
          </div>

          <div class="md-layout">
            <label class="md-layout-item md-size-20 md-form-label">Name</label>
            <div class="md-layout-item md-size-50">
              <ValidationProvider
                name="SystemVersion"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-input v-model="SystemVersion" type="text"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
          </div>

          <el-table :data="Engners" height="400">
            <el-table-column prop="_id" label="id"></el-table-column>
            <el-table-column prop="Name" label="Name"></el-table-column>
            <el-table-column label="Assigne" prop="assgin">
              <template slot-scope="scope">
                <el-button @click="assgine(scope.row, scope.$index)">{{
                  scope.row.assgin === true ? "Assigned" : "Assign"
                }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </modal>

      <modal
        v-if="showModalintarnal"
        @close="
          showModalintarnal = false;
          InternalanswerT = Internalanswer;
        "
      >
        <h3 slot="header">Intarnal note</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="InternalanswerT"
                type="text"
                rows="30"
                cols="120"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              saveIntarnal();
              showModalintarnal = false;
            "
            class="md-success"
            >Save</md-button
          >
          {{ " " }}
          <md-button
            @click="
              showModalintarnal = false;
              InternalanswerT = Internalanswer;
            "
            class="md-info"
            >Close</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModalformal"
        @close="
          showModalformal = false;
          FormalanswerT = Formalanswer;
        "
      >
        <h3 slot="header">Formal answer</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="FormalanswerT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              saveFormal();
              showModalformal = false;
            "
            class="md-success"
            >Save</md-button
          >
          {{ " " }}
          <md-button
            @click="
              showModalformal = false;
              FormalanswerT = Formalanswer;
            "
            class="md-info"
            >Close</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModalsorce"
        @close="
          showModalsorce = false;
          SourceT = Source;
        "
      >
        <h3 slot="header">Source</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="SourceT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              Source = SourceT;
              showModalsorce = false;
            "
            class="md-success"
            >Save</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModaldestnation"
        @close="
          showModaldestnation = false;
          DestinationT = Destination;
        "
      >
        <h3 slot="header">Destination</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="DestinationT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              Destination = DestinationT;
              showModaldestnation = false;
            "
            class="md-success"
            >Save</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModalIncidentAnalysis"
        @close="
          showModalIncidentAnalysis = false;
          IncidentAnalysisT = IncidentAnalysis;
        "
      >
        <h3 slot="header">Incident Analysis</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="IncidentAnalysisT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              IncidentAnalysis = IncidentAnalysisT;
              showModalIncidentAnalysis = false;
            "
            class="md-success"
            >Save</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModalImpactAnalysis"
        @close="
          showModalImpactAnalysis = false;
          ImpactAnalysisT = ImpactAnalysis;
        "
      >
        <h3 slot="header">Impact Analysis</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="ImpactAnalysisT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              ImpactAnalysis = ImpactAnalysisT;
              showModalImpactAnalysis = false;
            "
            class="md-success"
            >Save</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModalContainmentActions"
        @close="
          showModalContainmentActions = false;
          ContainmentActionsT = ContainmentActions;
        "
      >
        <h3 slot="header">Containment Actions</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="ContainmentActionsT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              ContainmentActions = ContainmentActionsT;
              showModalContainmentActions = false;
            "
            class="md-success"
            >Save</md-button
          >
        </div>
      </modal>

      <modal
        v-if="showModalRecommendation"
        @close="
          showModalRecommendation = false;
          RecommendationT = Recommendation;
        "
      >
        <h3 slot="header">Recommendation</h3>
        <div slot="body">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <textarea
                v-model="RecommendationT"
                type="text"
                rows="30"
                cols="120"
                maxlength="350"
              ></textarea>
              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div slot="footer">
          <md-button
            @click="
              Recommendation = RecommendationT;
              showModalRecommendation = false;
            "
            class="md-success"
            >Save</md-button
          >
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Pagination } from "@/components";
import users from "./users";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, numeric, regex, confirmed } from "vee-validate/dist/rules";
extend("required", required);
extend("numeric", numeric);
extend("regex", regex);
extend("confirmed", confirmed);
import Modal from "./modal.vue";
import env from "../../../../env";
export default {
  async created() {
    if (localStorage.getItem("role")) {
      this.role = localStorage.getItem("role");
    } else {
      this.$router.replace("/login");
    }
    this.getTicketInfo();
    this.id = this.$route.params.id;
    this.getEnge();
    this.Origin = env.URL();
  },
  components: {
    SlideYDownTransition,
    Modal
  },
  computed: {
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      Origin: "",
      Url: "",
      role: "",
      showModalRecommendation: false,
      showModalContainmentActions: false,
      showModalImpactAnalysis: false,
      showModalIncidentAnalysis: false,
      showModaldestnation: false,
      showModalsorce: false,
      Source: "",
      Destination: "",
      IncidentAnalysis: "",
      ImpactAnalysis: "",
      ContainmentActions: "",
      Recommendation: "",
      SourceT: "",
      DestinationT: "",
      IncidentAnalysisT: "",
      ImpactAnalysisT: "",
      ContainmentActionsT: "",
      RecommendationT: "",
      FormalanswerT: "",
      showModalformal: false,
      showModalintarnal: false,
      Engners: [],
      id: "",
      Internalanswer: "",
      InternalanswerT: "",
      Formalanswer: "",
      Descrption: "",
      Status: "",
      Impact: "",
      Catagory: "",
      Title: "",
      Phone: "",
      From: "",
      Severity: "",
      Ticketnumber: "",
      data: {},
      showModal: false,
      currentSort: "Titel",
      currentSortOrder: "asc",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["Titel", "Severity", "Status"],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
    save(name, value) {
      name = value;
    },
    convert(event) {
      try {
        let d = new Date(event);
        if (isNaN(d.getFullYear()) === true) {
          return "-";
        }
        return (
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " , " +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds()
        );
      } catch (error) {}
    },
    async getAssegned() {
      try {
        this.Engners.forEach(element => {
          element.assgin = false;
          return;
        });
        let assi = {};
        let tocken = localStorage.getItem("Nannotoken");
        let assine = await axios.get(
          env.URL() + "Nanosoft/assigne/" + this.id,
          { headers: { authorization: tocken } }
        );
        if (assine.status === 200) {
          assine.data.result.forEach(el => {
            this.Engners.forEach(element => {
              assi = element;
              if (element._id === el.engId) {
                element.assgin = true;
                return;
              }
            });
          });
          this.Engners.push(assi);
          this.Engners.pop();
        }
      } catch (error) {
        // console.log(error);
      }
    },
    saveIntarnal() {
      this.Internalanswer = this.InternalanswerT;
    },
    saveFormal() {
      this.Formalanswer = this.FormalanswerT;
    },
    async assgine(row, index) {
      try {
        if (row.assgin === false) {
          let schema = {
            id: this.id,
            eng: row._id
          };
          let tocken = localStorage.getItem("Nannotoken");
          let Engneeiers = await axios.post(
            env.URL() + "Nanosoft/assigne",
            schema,
            { headers: { authorization: tocken } }
          );
          if (Engneeiers.status === 200) {
            this.Engners.forEach(element => {
              if (element._id === row._id) {
                element.assgin = !element.assgin;
              }
              this.Engners.push(row);
              this.Engners.pop();
            });
          }
          return;
        }
        let schema = {
          id: this.id,
          eng: row._id
        };
        let tocken = localStorage.getItem("Nannotoken");
        let Engneeiers = await axios.post(
          env.URL() + "Nanosoft/asssigne",
          schema,
          { headers: { authorization: tocken } }
        );
        this.Engners.forEach(element => {
          if (element._id === row._id) {
            element.assgin = !element.assgin;
          }
        });
        this.Engners.push(row);
        this.Engners.pop();
      } catch (error) {
        // console.log(error);
      }
    },
    async getEnge() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let Engneeiers = await axios.get(
          env.URL() + "Nanosoft/Get/SupportEng/",
          { headers: { authorization: tocken } }
        );
        this.Engners = Engneeiers.data.result;
        this.Engners.forEach(element => {
          element["assgin"] = false;
        });
        // console.log(this.Engners);
      } catch (error) {
        // console.log(error);
      }
    },
    async getTicketInfo() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let result = await axios.get(
          env.URL() + "Nanosoft/Ticket-info/" + this.$route.params.id,
          { headers: { authorization: tocken } }
        );
        this.data = result.data;
        this.Ticketnumber = result.data.ticket.ticketNumber;
        this.From = result.data.ticket.Userid.Email;
        this.Phone = result.data.ticket.Userid.Phone;
        this.Title = result.data.ticket.Titel;
        this.Status = result.data.ticket.Status;
        this.Descrption = result.data.ticket.Description;
        this.Severity = result.data.ticket.Severity;
        (this.Formalanswer = result.data.ticket.FormalAnser),
          (this.FormalanswerT = result.data.ticket.FormalAnser),
          (this.Internalanswer = result.data.ticket.Internalanswer);
        this.InternalanswerT = result.data.ticket.Internalanswer;
        this.Source = result.data.ticket.Source;
        this.Destination = result.data.ticket.Destination;
        this.IncidentAnalysis = result.data.ticket.IncidentAnalysis;
        this.ImpactAnalysis = result.data.ticket.ImpactAnalysis;
        this.ContainmentActions = result.data.ticket.ContainmentActions;
        this.Recommendation = result.data.ticket.Recommendation;
        this.SourceT = result.data.ticket.Source;
        this.DestinationT = result.data.ticket.Destination;
        this.IncidentAnalysisT = result.data.ticket.IncidentAnalysis;
        this.ImpactAnalysisT = result.data.ticket.ImpactAnalysis;
        this.ContainmentActionsT = result.data.ticket.ContainmentActions;
        this.RecommendationT = result.data.ticket.Recommendation;
        (this.Catagory = result.data.ticket.category._id),
          (this.Impact = result.data.ticket.Impact._id);
      } catch (error) {
        // console.log(error);
      }
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    handleLike(item) {
      Swal.fire({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success"
      });
    },
    async pdf() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let result = await axios.get(env.URL() + "Nanosoft/PDF/" + this.id, {
          headers: { authorization: tocken }
        });
        if (result.status === 200) {
          this.Url = env.URL() + "report/" + result.data.url;
          return Swal.fire({
            title: `Good job!`,
            text: "The report generated successfully",
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
            type: "success"
          });
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: "sorry !",
          text: error.response.data.message,
          type: "success",
          confirmButtonClass: "md-button md-success",
          buttonsStyling: false
        });
      }
    },
    handleEdit(item) {
      const offsetTop = document.getElementById("#content");
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
      this.isUpdate = true;
      this.item = item;
      this.Name = item.Name;
      this.id = item._id;
    },
    async submit() {
      try {
        let tocken = localStorage.getItem("Nannotoken");
        let schema = {
          Status: this.Status,
          id: this.id,
          Titel: this.Title,
          Severity: this.Severity,
          Description: this.Descrption,
          category: this.Catagory,
          Impact: this.Impact,
          FormalAnser: this.Formalanswer,
          Internalanswer: this.Internalanswer,
          Source: this.Source,
          Destination: this.Destination,
          IncidentAnalysis: this.IncidentAnalysis,
          ImpactAnalysis: this.ImpactAnalysis,
          ContainmentActions: this.ContainmentActions,
          Recommendation: this.Recommendation
        };
        let result = await axios.patch(
          env.URL() + "Nanosoft/update/ticket",
          schema,
          { headers: { authorization: tocken } }
        );
        if (result.status === 200) {
          this.getTicketInfo();
          this.Url = "";
          return Swal.fire({
            title: `Good job!`,
            text: "The tickt updated",
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
            type: "success"
          });
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: "sorry !",
          text: error.response.data.message,
          type: "success",
          confirmButtonClass: "md-button md-success",
          buttonsStyling: false
        });
      }
    },
    handleDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(item);
          Swal.fire({
            title: "Deleted!",
            text: `You deleted ${item.name}`,
            type: "success",
            confirmButtonClass: "md-button md-success btn-fill",
            buttonsStyling: false
          });
        }
      });
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["Titel", "SystemVersion"],
      threshold: 0.3
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.m {
  margin-right: 20px;
}
</style>

<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}
</style>
