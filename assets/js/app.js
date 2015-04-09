(function() {
  'use strict';
  angular.module('app', ['app.ui.directives']).controller('DashboardController', [
    '$scope', function($scope) {
      $scope.processData = {
        // 节点间距，会画流程线
        "gap": 160,
        // 节点数据
        "nodes": [
          {
            "type": "ok",
            "label": "开始",
            "message": ""
          }, {
            "type": "ok",
            "label": "报修",
            "message": "报修日期：2015年03月01日"
          }, {
            "type": "wait",
            "label": "分单",
            "message": "分单日期：2015年03月02日"
          }, [
            [
              {
                "type": "ok",
                "label": "派工",
                "message": "派工日期：2015年03月03日"
              }, {
                "type": "ok",
                "label": "填报",
                "message": "填报日期：2015年03月04日"
              }, {
                "type": "ok",
                "label": "确认",
                "message": "确认日期：2015年03月04日"
              }
            ], [
              {
                "type": "wait",
                "label": "派工",
                "message": ""
              }, {
                "type": "will",
                "label": "填报",
                "message": ""
              }, {
                "type": "will",
                "label": "确认",
                "rollback": -2,
                "message": "退回日期：2015年03月04日"
              }
            ], [
              {
                "type": "will",
                "label": "派工",
                "rollback": -1,
                "message": "退回日期：2015年03月03日"
              }, {
                "type": "will",
                "label": "填报",
                "message": ""
              }, {
                "type": "will",
                "label": "确认",
                "message": ""
              }
            ]
          ], {
            "type": "will",
            "label": "结束",
            "message": ""
          }
        ]
      };
      return $scope.message = '';
    }
  ]);

}).call(this);