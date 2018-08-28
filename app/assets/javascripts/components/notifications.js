Vue.component(
	'notifications',
	{
		template: `
			<div class="notifications">
				<div v-for="notification in notifications"
					 v-bind:class="((!notification.is_read)?'is-primary':'') + ' notification'">
					<span class="notification-text" v-html="notif_html(notification)">
					</span>
					<a v-bind:href="notification.link" class="notification-link notification-date">
						{{ new Date(notification.created_at).toLocaleString() }}
					</a>
				</div>
			</div>
			`,
		props: ['notifications'],
		data: function(){
			return {
			  	
			}	  
		},
		methods: {
			notif_html: function(notification){
				var text = notification.text;
				return text.replace(/link\{(.*)\}/, function(string, title){
					return "<a href='" + notification.link + "'>" + title + "</a>";
				})
			}
		}
	}
);