<header>

    <div id="header-top">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <p></p>
                </div>
            </div>
        </div>
    </div>

    <div id="header-content">
        <div class="container">
            <div class="row">
                <div class="menu-header col-xs-12">
                    @include('partials.navigation')
                </div>
            </div>
        </div>
    </div>

    <div id="header-bottom">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    @include('isearch::forms.search-int')
                    @include('partials.social')

                </div>
            </div>
        </div>
    </div>

</header>