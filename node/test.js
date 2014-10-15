                if (from == "applicants") {
                    var locData = JSON.parse(sessionStorage.getItem("routeflag"));
                    if(locData== 0){
                        self.trigger("navigate","#applicants");
                    }else{
                        self.trigger("navigate","#applicants?v="+Math.random(10000));
                    }
                } else if (from == "fromcampus") {
                    self.trigger('navigate', 'applicants/' + from + '?projectId=' + Context.getGlobal("SendMessage").projectId + '&from=' + from + '&ids=0'  );
                } else if (from == "frompools") {
                    var optionId = Context.getGlobal("SendMessage").optionIds[0];
                    self.trigger('navigate', 'applicants/' + from + '?StoreDbId=' + optionId + '&from=' + from + '&ids=0'  );

                } else if (from == "details" && detailUrl) {
                    var personIds = Context.getGlobal("SendMessage").personIds[0];
                    var optionId = Context.getGlobal("SendMessage").optionIds[0];
                    self.trigger('navigate', detailUrl + '&personId=' + personIds + '&jobId=' + optionId + '&ids=0'  );
                } else if (from == "exam" && detailUrl && jobKey) {
                    //self.trigger('navigate', '#settings/examinations/arrangement/show?id=' + detailUrl);
                    self.trigger('navigate', 'settings/examinations/show?id=' + detailUrl + '&from=fromjobs&jobId=' + jobKey  );
                } else if (from == "settingsExaminations") {
                    self.trigger('navigate', 'settings/examinations/show?id=' + detailUrl + '&from=settingsExaminations'  );
                } else if (from == "onbordingList") {
                    self.trigger('navigate', 'onboarding/list?from=onbordingList'  );
                } else if (from == "newhire" && detailUrl) {
                    self.trigger('navigate', 'onboarding/list/newhire?id=' + detailUrl  );
                } else if (from == "pools" && detailUrl) {
                    self.trigger('navigate', 'pools?from=pools');
                } else {

                    //self.trigger('navigate', 'applicants/'+from+'?from='+from+'&ids='+submitIds);
                    self.trigger('navigate', 'applicants/' + from + '?from=' + from + '&jobId=' + Context.getGlobal("SendMessage").optionIds[0] + '&ids=0'  );

                }