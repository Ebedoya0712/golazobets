@props(['url'])
<tr>
	<td class="header">
		<a href="{{ $url }}" style="display: inline-block;">
			<img
				src="{{  config('app.url').config('settings.theme.light.logo') }}"
				alt="{{ config('app.name') }}"
				style="
				width: 100px;
				margin-left: auto;
				margin-right: auto;
				display: block;
			">
		</a>
	</td>
</tr>