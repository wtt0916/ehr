<template>
  <div class="stru-pic">
    <!--导出图片功能暂时不做-->
    <!--<el-button id="btndown">导出图片</el-button>-->
    <div v-loading="loading" id="chart-container"></div>
    <!--添加子集弹框-->
    <addChildDialog :show.sync="showaddchildDialog" :parentModel="addModel" @addChilds="addChilds"></addChildDialog>
    <!--编辑的弹框-->
    <editNode :show.sync="showEdit" :model="eidtModel" @editSave="editSave"></editNode>
    <!--合并弹框-->
    <mergeDialog
      v-if="showMerge"
      :show.sync="showMerge"
      :cur-model="mergeModel"
      :data-source="oc.datasource"
      @mergeEnd="mergeEnd"
    ></mergeDialog>
    <!--移动弹框-->
    <moveDialog
      v-if="showMove"
      :show.sync="showMove"
      :cur-model="moveModel"
      :data-source="oc.datasource"
      @moveEnd="moveEnd"
    ></moveDialog>
  </div>
</template>

<script>
import orgchart from "orgchart";
import addChildDialog from "../components/addChildDialog";
import editNode from "../components/editNode";
import mergeDialog from "../components/mergeDialog";
import moveDialog from "../components/moveDialog";

/**获取orgchart配置 */
// let oc_init = datasource => {
//   return {
//     data: datasource, //数据
//     draggable: true,
//     // 'exportButton':true,
//     createNode: function($node, data) {
//       let node = `<i class="icons el-icon-edit"></i>
// 								   <div>${data.company}（${data.name}）</div>
// 								   <div><i class="el-icon-view"></i><span class="number">${
//                      data.num
//                    }</span></div>
// 								   <div class="btns pos-bottom" data-id="${data.id}">
// 										<span>
// 											<i class="icon el-icon-view zysee"></i>
// 										</span>
// 										<span>
// 											<i class="icon el-icon-circle-plus zyplus"></i>
// 										</span>
// 										<span>
// 											 <i class="icon el-icon-edit zyedit"></i>
// 										</span>
// 										<span>
// 											 <i class="icon el-icon-upload zymove"></i>
// 										</span>
// 										<span>
// 											 <i class="icon el-icon-upload zyedit"></i>
// 										</span>
// 										<span>
// 											  <i class="icon el-icon-delete zydel"></i>
// 										</span>
// 								   </div>
// 								   <i class="edge verticalEdge topEdge fa"></i>
// 								   <i class="edge horizontalEdge rightEdge fa"></i>
// 								   <i class="edge horizontalEdge leftEdge fa"></i>
// 								   <i class="edge verticalEdge bottomEdge fa"></i>`;
//       $node.html(node);
//     },
//     dropCriteria: function(draggedNode, dragZone, dropZone) {
//       //自己,现在的爸爸,目标爸爸
//       // console.log(draggedNode,dragZone,dropZone);
//       return true;
//     }
//   };
// };
// let treeData = "";
export default {
  components: { addChildDialog, editNode, mergeDialog, moveDialog },
  data() {
    return {
      loading:false,
      showTree: false,
      showaddchildDialog: false,
      showEdit: false,
      showMerge: false,
      showMove: false,
      addNodeId: 0,
      addModel:null,
      eidtModel: null
    };
  },
  mounted() {
    this.oc = {
      example: null,
      datasource: null,
      init: () => {
        let config = {
          data: this.oc.datasource, //数据
          draggable: true,
          // 'exportButton':true,
          createNode: function($node, data) {
            console.log($node,data);
            const icons = {
              1: "el-icon-office-building",
              2: "el-icon-house",
              3: "el-icon-wallet"
            };
            let node = `<i class="icons ${icons[data.type || 1]}"></i>
								   <div class="oTitle">${data.depName}（${data.leader ||
            data.contact ||
            "暂无"}）</div>
								   <div class="oNumber"><i class="el-icon-user"></i><span class="number"> ${
                    data.num
                    }</span></div>
								   <div class="btns pos-bottom" data-id="${data.id}">
										<span>
											<i class="icon el-icon-view zysee"></i>
										</span>
										<span>
											<i class="icon el-icon-circle-plus-outline zyplus"></i>
										</span>
										<span>
											 <i class="icon el-icon-edit-outline zyedit"></i>
                    </span>`;
            if (data.parentId) {
              node += `<span>
											 <i class="icon el-icon-files zymove"></i>
										</span>
										<span>
											 <i class="icon el-icon-copy-document zymerge"></i>
										</span>
										<span>
											  <i class="icon el-icon-delete zydel"></i>
										</span>
                   </div>`;
            }
            node += `<i class="edge verticalEdge topEdge fa"></i>
								   <i class="edge horizontalEdge rightEdge fa"></i>
								   <i class="edge horizontalEdge leftEdge fa"></i>
								   <i class="edge verticalEdge bottomEdge fa"></i>`;
            $node.html(node);
            // let node = `<i class="icons ${icons[data.type || 1]}"></i>
			// 					   <div class="oTitle">${data.depName}（${data.leader||data.contact||'暂无'}）</div>
			// 					   <div class="oNumber"><i class="el-icon-user"></i><span class="number"> ${
            //          data.num
            //        }</span></div>
			// 					   <div class="btns pos-bottom" data-id="${data.id}">
			// 							<span>
			// 								<i class="icon el-icon-view zysee"></i>
			// 							</span>
			// 							<span>
			// 								<i class="icon el-icon-circle-plus-outline zyplus"></i>
			// 							</span>
			// 							<span>
			// 								 <i class="icon el-icon-edit-outline zyedit"></i>
			// 							</span>
			// 							<span>
			// 								 <i class="icon el-icon-files zymove"></i>
			// 							</span>
			// 							<span>
			// 								 <i class="icon el-icon-copy-document zymerge"></i>
			// 							</span>
			// 							<span>
			// 								  <i class="icon el-icon-delete zydel"></i>
			// 							</span>
			// 					   </div>
			// 					   <i class="edge verticalEdge topEdge fa"></i>
			// 					   <i class="edge horizontalEdge rightEdge fa"></i>
			// 					   <i class="edge horizontalEdge leftEdge fa"></i>
			// 					   <i class="edge verticalEdge bottomEdge fa"></i>`;
            // $node.html(node);
          },
          dropCriteria: function(draggedNode, dragZone, dropZone) {
            //自己,现在的爸爸,目标爸爸
            // console.log(draggedNode,dragZone,dropZone);
            return true;
          }
        };
        if (!this.oc.example)
          this.oc.example = $("#chart-container").orgchart(config);
        else this.oc.example.init(config);
        /**监听移动后的变化 */
        this.oc.example.$chart.on("nodedrop.orgchart", (
          event,
          extraParams
        ) =>{
            // console.log(extraParams.draggedNode[0].id); //移动的nodeID
            // console.log(extraParams.dropZone[0].id); //目标的nodeID

            let moveModel= [this.oc.datasource].findRecursion(f => f.id == extraParams.draggedNode[0].id);
            let targetModel= [this.oc.datasource].findRecursion(f => f.id == extraParams.dropZone[0].id);
            moveModel.parentId = targetModel.depId;

            [moveModel].findRecursion(f=>{
                if(f.level) delete f.level;
                if(f.relationship) delete f.relationship;
            });
            console.log(moveModel);
            const url = '';
            // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
            this.$http.post(`${url}/deplist/moveDep`, moveModel).then(response => {
                [this.oc.datasource].findRecursion(f => {
                    const index = (f.children || []).findIndex(
                        m => m.id == moveModel.id
                    );
                    if (index > -1) {
                        f.children.splice(index, 1);
                    }
                });
                [this.oc.datasource].findRecursion(f => {
                    if (f.depId == moveModel.parentId) {
                        if (!f.children) f.children = [];
                        f.children.push(moveModel);
                    }
                });

            }).catch(function(error) {
              console.log(error);
            });


            console.log(this.oc.datasource);
          setTimeout(() => {
            // console.log(this.oc.example.getHierarchy());
          }, 500);
        });

        /**组织架构图绑定事件 */
        $(".orgchart").on("click", event => {
          const oTarget = event.target;
          if (oTarget.nodeName != "I" && !oTarget.classList.contains("icon"))
            return;
          const oTargetClass = oTarget.className,
            nodeId = $(oTarget).parents(".btns").attr("data-id"); //获取"data-"的属性

          if (oTargetClass.includes("zyplus")) {
            this.openAdd(nodeId);
          } else if (oTargetClass.includes("zyedit")) {
            this.edit(nodeId);
          } else if (oTargetClass.includes("zymove")) {
            this.toMove(nodeId);
          } else if (oTargetClass.includes("zydel")) {
            this.delChild(nodeId);
          } else if (oTargetClass.includes("zymerge")) {
            this.toMerge(nodeId);
          } else if (oTargetClass.includes("zysee")) {
            //点击查看按钮
            this.$router.push({
              path: "/"
            });
          }
        });
      }
    };
    this.loading=true;
    let url = '/deplist/getStructure';
    // let url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer';
    this.$http.get(url,{
      params:{
        companyId:1
      }
    }).then(response => {
      console.log(response.result);
      this.oc.datasource = response.result;
      this.showTree = true;
      this.oc.init();
      // oc = $("#chart-container").orgchart(oc_config(treeData));
      // /**监听移动后的变化 */
      // oc.$chart.on("nodedrop.orgchart", function(event, extraParams) {
      //   setTimeout(() => {
      //     //console.log(container.getHierarchy());
      //   }, 500);
      // });

      // /**组织架构图绑定事件 */
      // $(".orgchart").on("click", function(event) {
      //   const oTarget = event.target;
      //   if (oTarget.nodeName != "I" && !oTarget.classList.contains("icon"))
      //     return;
      //   const oTargetClass = oTarget.className,
      //     nodeId = $(oTarget)
      //       .parents(".btns")
      //       .attr("data-id"); //获取"data-"的属性

      //   if (oTargetClass.includes("zyplus")) {
      //     self.openAdd(nodeId);
      //   } else if (oTargetClass.includes("zyedit")) {
      //     self.edit(nodeId);
      //   } else if (oTargetClass.includes("zymove")) {
      //     self.toMove(nodeId);
      //   } else if (oTargetClass.includes("zydel")) {
      //     self.delChild(nodeId);
      //   } else if (oTargetClass.includes("zysee")) {
      //     //点击查看按钮
      //     self.$router.push({
      //       path: "/"
      //     });
      //   }
      // });

      // 导出图片功能暂时不做
      // $("#btndown").on("click", ()=> {
      //     //获取节点高度，后面为克隆节点设置高度。
      //     var height = $(".orgchart").height()+20
      //     //克隆节点，默认为false，不复制方法属性，为true是全部复制。
      //     var cloneDom = $(".orgchart").clone(true);
      //     //设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
      //     cloneDom.css({
      //         "background-color": "white",
      //         "position": "absolute",
      //         "top": "0px",
      //         "z-index": "-100",
      //         "height": height
      //     });
      //     //将克隆节点动态追加到body后面。
      //     $("body").append(cloneDom);
      //     //插件生成base64img图片。
      //     html2canvas(cloneDom, {
      //         //Whether to allow cross-origin images to taint the canvas
      //         allowTaint: true,
      //         //Whether to test each image if it taints the canvas before drawing them
      //         taintTest: false,
      //         onrendered: function(canvas) {
      //             var img = canvas.toDataURL('image/jpeg', 1.0);
      //             //打印出来之后:data:image/jpeg;base64,/9j/4AAQSkZJRg....
      //             console.log(img);
      //
      //             $('body').append($('<a id="abtndown" download="组织架构.png" href="javasvript:;"></a>'))
      //             $("#abtndown").attr("href",img);
      //             setTimeout(()=>{
      //                 document.getElementById("abtndown").click()
      //             },0)
      //         }
      //     });
      // });
    }).finally(t=>{
      this.loading = false;
    });
    Array.prototype.findRecursion = function(funCompareOrValue) {
      var result = null;
      if (this) {
        for (var i = 0; i < this.length; i++) {
          if (funCompareOrValue(this[i], i)) {
            result = this[i];
            break;
          } else {
            var childs = this[i].children;
            if (childs) {
              result = childs.findRecursion(funCompareOrValue);
              if (result != null) break;
            }
          }
        }
      }
      return result;
    };
  },
  methods: {
    // 新增子集
    openAdd(nodeId) {
      // this.addNodeId = nodeId;
      this.addModel = [this.oc.datasource].findRecursion(f => f.id == nodeId);
      this.showaddchildDialog = true;
    },
    addChilds(models) {
      console.log(models);
      models.forEach(t=>{
        t.num = 0;
      })
      // models = models.map(m => {
      //   return {
      //     depName: m.depName,
      //     leader: m.leader,
      //     id: m.leaderId,
      //     depId:m.depId,
      //     num: 0
      //   };
      // });
      let curObj = [this.oc.datasource].findRecursion(
        f => f.id == this.addModel.id
      );
      if (!curObj.children) curObj.children = [];
      curObj.children = curObj.children.concat(models);
      this.oc.init();
    },
    //编辑
    edit(nodeId) {
      this.eidtModel = [this.oc.datasource].findRecursion(f => f.id == nodeId);
      this.showEdit = true;
    },
    editSave(newModel) {
        console.log(newModel);
      this.eidtModel.depName = newModel.depName;
      this.eidtModel.leader = newModel.leader;
      //重新渲染图
      this.oc.init();
    },
    //移动区域
    toMove(nodeId) {
      this.moveModel = [this.oc.datasource].findRecursion(f => f.id == nodeId);
      this.showMove = true;
    },
    moveEnd() {
      this.oc.init();
    },
    // 合并区域
    toMerge(nodeId) {
      this.mergeModel = [this.oc.datasource].findRecursion(f => f.id == nodeId);
      this.showMerge = true;
    },
    mergeEnd() {
      this.oc.init();
    },
    // 删除
    delChild(nodeId) {
      let node = [this.oc.example.getHierarchy()].findRecursion(
        f => f.id == nodeId
      );
      // if (node.children && node.children.length) {
      //   this.$message({
      //     message: "不能删除，此项已有子节点",
      //     type: "warning"
      //   });
      //   return;
      // }
      let $node = $(`#${nodeId}.node`);
      // if ($node.find(".number").text() != 0) {
      //   this.$message({
      //     message: "不能删除，此项已有成员",
      //     type: "warning"
      //   });
      //   return;
      // }
      this.$confirm("确认删除？").then(() => {
        const url = '';
        // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
        this.$http.get(`${url}/deplist/deleteDep`, {
          params:{
            id: nodeId
          }
        }).then(res => {
            this.oc.example.removeNodes($node);
            //删除不需要重新渲染整个组织架构，调用api删除后，同步到数据源即可
            deleteNode(nodeId, this.oc.datasource);
            function deleteNode(id, obj) {
              if (obj.id === id) {
                return true;
              }
              let pure = [];
              for (let i of obj.children || []) {
                if (deleteNode(id, i)) {
                } else {
                  pure.push(i);
                }
              }
              obj.children = pure;
              return false;
            }
          });
      });
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/colors";
.stru-pic {
  position: relative;
  button.picture {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 90px;
    height: 30px;
    font-size: 13px;
  }
}
#chart-container {
  overflow: auto;
}
#chart-container{
  .orgchart {
    background: #fff;
  }
  .orgchart .node {
    border: 1px solid @base;
    background: #fff;
    color: #333;
    width: 170px;
    height: 120px;
    border-radius: 4px;
    padding: 10px;
    position: relative;
    font-size: 15px;
    i.icons {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    margin: 0 20px;
  }
  .orgchart .node:hover {
    background: #fff;
  }
  .orgchart .node.focused {
    background: #fff;
  }
  .orgchart .node.allowedDrop {
    border-width: 2px;
  }
  .orgchart .node .btns {
    /*display: none;*/
    span {
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: inline-block;
    }
  }
  .orgchart .node .pos-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
  }
  .orgchart .node:hover .pos-bottom {
    display: block;
  }
  .orgchart .node :hover .btns {
    display: block;
  }
  .orgchart .node .oTitle {
    margin-top: 18px;
    font-size: 13px;
  }
  .orgchart .node .oNumber {
    margin-top: 10px;
    font-size: 13px;
  }
  .orgchart .lines{
    .leftLine{
      border-left: 1px solid rgba(204,204,204,.5);
    }
    .topLine{
      border-top: 2px solid rgba(204,204,204,.5);
    }
    .rightLine{
      border-right: 1px solid rgba(204,204,204,.5);
    }
    .downLine{
      background-color: rgba(204,204,204,.5);
    }
  }
}


table.t-dialog {
  border-collapse: separate;
  border-spacing: 10px 10px;
}
</style>