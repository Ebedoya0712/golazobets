<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>{{ $title ?? 'Email Notification' }}</title>
</head>

<body
	style="
		background-color: #FFF; 
		color: #333; 
		font-size:15px;
		font-family: sans-serif; 
		margin: 0; 
		padding: 0; 
		line-height: 1.6;
	">

	<div style="
		padding-top: 40px;
		padding-bottom: 30px;
		padding-left: 10px;
		padding-right: 10px;
	">
		<img
			src="{{  config('app.url').config('settings.theme.light.logo') }}"
			alt="{{ config('app.name') }}"
			style="
				width: 100px;
				margin-left: auto;
				margin-right: auto;
				display: block;
			">
	</div>

	<div>
		<div style="
			background-color: #FFF;
			max-width:600px;
			padding-left: 30px;
			padding-right: 30px;
			padding-top: 30px;
			padding-bottom: 30px;
			margin-left: auto;
			margin-right: auto;
			border-radius: 16px;
		">