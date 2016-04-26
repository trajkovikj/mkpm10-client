var requests = (function requests(){

	return {

		getAllMonthsByYears : function () {

			var data = [
				{
					year: '2013',
					months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
				},
				{
					year: '2014',
					months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
				},
				{
					year: '2015',
					months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
				},
				{
					year: '2016',
					months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај']
				}
			];

			return {
				done : function (callback) {
					callback(data);
				},

				fail : function (callback) {
					var jqXHR, textStatus, errorThrown;
					callback(jqXHR, textStatus, errorThrown);
				}
			}
		},

		getAllAvg : function (year, month) {

			var data = [
				{
					date: new Date('2016-01-01'),
					pmValue : 30
				},
				{
					date: new Date('2016-01-02'),
					pmValue : 50
				},
				{
					date: new Date('2016-01-03'),
					pmValue : 70
				},
				{
					date: new Date('2016-01-04'),
					pmValue : 200
				},
				{
					date: new Date('2016-01-05'),
					pmValue : 800
				}
			];

			return {
				done : function (callback) {
					callback(data);
				},

				fail : function (callback) {
					var jqXHR, textStatus, errorThrown;
					callback(jqXHR, textStatus, errorThrown);
				}
			}
		}

	};

})();


