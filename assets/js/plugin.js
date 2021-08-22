
$(document).ready(function(){

    /* -- Open & Close Submenus -- */
    $('.side-menu .main-menu li a').on('click',function(e){
        var link_val = $(this).data('link');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $('.sub-main-menu').each(function(){
            if(link_val == $(this).data('link')) {
                $(this).toggleClass('open');
            } else {
                $(this).removeClass('open');
            }
        });
    });
    $('.sub-main-menu .close-btn').on('click',function(){
        $(this).parent().removeClass('open');
    });
    $('.page-body').on('click',function(){
        $('.sub-main-menu.open').removeClass('open');
    });
    /* -- ./Open & Close Submenus -- */

    /* -- Open & Close Profile Menu -- */
    $('.top-main-menu > ul .sub-menu > a').on('click',function(){
        $('.top-main-menu > ul .sub-menu').toggleClass('open');
    });
    /* -- ./Open & Close Profile Menu -- */

    /* ========= Countries List ========== */
    /* Selection */
    $('.select-country .all-btn').on('click',function(){
        $(this).parent().siblings('select').empty();
        if(!$(this).hasClass('open')) {
            $(this).parent().parent().siblings('.selected-box').children('ul').children('li').removeClass('show');
            $(this).addClass('open');
            $(this).parent().siblings('.countries-list').children('li').addClass('checked');
            $(this).siblings('input').val('');
            $(this).parent().siblings('.countries-list').children('li').each(function(){
                /* Show selected countries in box */
                if(!$(this).hasClass('no-results')) {
                    var temp = $(this).data('value'),
                        option_select = '<option value="' + temp + '">' + temp +'</option>';
                        temp = 'li[data-value="' + temp + '"]';
                    $(this).fadeIn(100);
                    $(this).parent().parent().siblings('.selected-box').children('ul').children(temp).addClass('show');
                    $(this).parent().siblings('select').append(option_select);
                }
                /* ./Show selected countries in box */
            });  
        }
    });
    $('.countries-list li').on('click',function(){
        $(this).parent().parent().siblings('.selected-box').children('ul').children('li').removeClass('show');
        $(this).parent().siblings('select').empty();
        $(this).toggleClass('checked');
        $(this).parent().children('li').each(function(){
            if (!$(this).hasClass('checked')) {
                $('.select-country .all-btn').removeClass('open');
                /* Show selected countries in box */
                var temp = $(this).data('value');
                    temp = 'li[data-value="' + temp + '"]';
                $(this).parent().parent().siblings('.selected-box').children('ul').children(temp).removeClass('show');
                /* ./Show selected countries in box */
            } else {
                /* Show selected countries in box */
                if(!$(this).hasClass('no-results')) {
                    var temp = $(this).data('value'),
                        option_select = '<option value="' + temp + '">' + temp +'</option>';
                        temp = 'li[data-value="' + temp + '"]';
                    $(this).parent().parent().siblings('.selected-box').children('ul').children(temp).addClass('show');
                    $(this).parent().siblings('select').append(option_select);
                }
                /* ./Show selected countries in box */
            }
        });
    });
    /* ./Selection */
    /* Search */
    $('.select-country .search input').keyup(function(){
        var input_val = $(this).val();
        if (input_val == '') {
            $(this).parent().siblings('.countries-list').children('li').fadeIn(100);
            $(this).parent().siblings('.countries-list').children('li.no-results').fadeOut(100);
        } else {
            var count = 0;
            $(this).parent().siblings('.countries-list').children('li').each(function(){
                if (!$(this).hasClass('no-results')){
                    var el_val = $(this).data('value');
                    if(el_val.includes(input_val)) {
                        $(this).fadeIn(100);
                        count++;
                    } else {
                        $(this).fadeOut(100);
                    }
                }
            });
            
            if (count == 0) {
                $(this).parent().siblings('.countries-list').children('li.no-results').fadeIn(10);
            } else {10
                $(this).parent().siblings('.countries-list').children('li.no-results').fadeOut(10);
            }
        }
    });
    /* ./Search */
    /* Remove countries from box */
    $('.select-country-box .selected-box li span').on('click',function(){
        $('.select-country .all-btn').removeClass('open');
        var input_val = $(this).parent().data('value'),
            temp = 'li[data-value="' + input_val + '"]';
        $(this).parent().removeClass('show');
        $(this).closest('.selected-box').siblings('.select-country').children('.countries-list').children(temp).removeClass('checked');
    
    });
    /* ./Remove countries from box */
    /* Open Countries List */
    $('.select-country-box .selected-box').on('click',function(){
        $(this).siblings('.select-country').addClass('open');
    });
    /* ./Open Countries List */
    /* Close Countries List */
    $('.select-country .close-btn').on('click',function(){
        $(this).parent('.select-country').removeClass('open');
    });
    /* ./Close Countries List */
    /* ========= ./Countries List ========== */

    /* ========= Payment Methods ========== */
    /* Payments Methods */
    $('.payment-methods .payment-box input').each(function(){
        if($(this).is(':checked')) {
            $(this).parents('.payment-box').children('.select-country-box').slideDown();
        }
    });
    $('.payment-methods .payment-box input').change(function(){
        if($(this).is(':checked')) {
            $(this).parents('.payment-box').children('.select-country-box').slideDown(500);
        } else {
            $(this).parents('.payment-box').children('.select-country-box').slideUp(500);
        }
    });
    /* ./Payments Methods */

    /* Commission Table */
    $('.commission-table .yes-no-btn input').each(function(){
        if(!$(this).is(':checked')) {
            $(this).parents('tr').children('td').children('.percent-box').children('input').attr('disabled','disabled');
            $(this).parents('tr').children('td').children('.percent-box').addClass('disabled');
        }
    });
    $('.commission-table .yes-no-btn input').change(function(){
        if(!$(this).is(':checked')) {
            $(this).parents('tr').children('td').children('.percent-box').children('input').val('');
            $(this).parents('tr').children('td').children('.percent-box').children('input').attr('disabled','disabled');
            $(this).parents('tr').children('td').children('.percent-box').addClass('disabled');
        } else {
            $(this).parents('tr').children('td').children('.percent-box').children('input').removeAttr('disabled');
            $(this).parents('tr').children('td').children('.percent-box').removeClass('disabled');
        }
    });
    /* ./Commission Table */
    /* ========= ./Payment Methods ========== */
    
    /* ========= Add Product ========== */

    /* -- Search Product For Offers -- */
    $('.product-search-area ul li').on('click',function(){
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            var ele_value = $(this).data('value');
            var temp_product = '.product-block-list .sub-product[data-value="'+ ele_value +'"]';
            $(temp_product).remove();
            if ($('.product-block-list .sub-product').length == 0) {
                $('.add-product-box .product-block-list').slideUp(500);
            }
        } else {
            $(this).addClass('selected');
            var ele_value = $(this).data('value'),
                temp_product = `
                <div class="sub-product row" data-value="`+ ele_value +`">
                    <div class="col-1">
                        <a href="#">
                            <img src="`+$(this).children('img').attr('src') +`" class="img-fluid" alt="صورة المنتج">
                        </a>
                    </div>
                    <div class="col-3">
                        <p>اسم المنتج:</p>
                        <a href="#" class="product-name">
                            `+ $(this).text() +`
                        </a>
                    </div>
                    <div class="col-2">
                        <p>الصنف:</p>
                        <span>طاولات</span>
                    </div>
                    <div class="col-1 text-center">
                        <p>الكمية:</p>
                        <span>12</span>
                    </div>
                    <div class="col-2 text-center">
                        <p>كمية العرض:</p>
                        <input type="number" min="1">
                    </div>
                    <div class="col-1 text-center">
                        <p>السعر:</p>
                        <span class="single-price">15 د.ك.</span>
                    </div>
                    <div class="col-2 text-center">
                        <p>سعر العرض:</p>
                        <input type="number" min="1">
                    </div>
                </div>
                `;
            $('.product-block-list').append(temp_product);    
            if ($('.product-block-list .sub-product').length == 1) {
                $('.add-product-box .product-block-list').slideDown(500);
            }  
        }
    });
    /* -- ./Search Product For Offers -- */

    /* -- Choose offer OR Discount Type -- */
    $('.discount-date input').on('change',function(){
        var input_val = $(this).data('value');
        var temp = '.date-input[data-value="' + input_val + '"]';
        if($(this).val() == 0) {
            $(temp).each(function(){
                $(this).attr('disabled','disabled');
                $(this).val('');
            });
        } else {
            $(temp).each(function(){
                $(this).removeAttr('disabled');
            });
        }
    });
    /* -- ./Choose offer OR Discount Type -- */

    /* -- Input Group Style -- */
    $('.input-group input').on('change',function(){
		if ($(this).val()) {
			$(this).addClass('not-empty');
		} else {
			$(this).removeClass('not-empty');
		}
	});
    $('.input-group input').each(function(){
		if ($(this).val()) {
			$(this).addClass('not-empty');
		} else {
			$(this).removeClass('not-empty');
		}
	});
    $('.input-group label').on('click',function(){
		$(this).siblings('input').focus();
	});
    /* -- ./Input Group Style -- */

    /* -- Tinymce Text Editor --*/
    tinymce.init({
        selector: '.tinymce',
        language : "ar",
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste"
        ],
        themes: "modern",
        menubar: true,
        resize: true,
      });
    /* -- ./Tinymce Text Editor --*/

    /* -- Calender -- */
    $( ".calendar" ).datepicker({
        monthNames: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
        monthNamesShort: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
        dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dayNamesShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dayNamesMin: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dateFormat: 'dd/mm/yy',
        firstDay: 0
    });
    
    $('.date-picker .input').on('click', function(e){
        var $parent = $(this).parents('.date-picker');
        $parent.addClass('this');
        $('.date-picker:not(.this)').each(function(){
            $(this).removeClass('open');
        });
        $parent.removeClass('this');
        $parent.toggleClass('open');
    });    
    $('.date-picker .calendar .close-calender').on('click', function(e){
        var $parent = $(this).parents('.date-picker');
        $parent.toggleClass('open');
    });    
    $(".calendar").on("change",function(){
        var $me = $(this),
            $selected = $me.val(),
            $parent = $me.parents('.date-picker');
        $parent.find('.result').children('span').html($selected);
        $parent.find('.result').children('input').val($selected);
    });    
    /* -- ./Calender -- */

    /* -- Discount Type -- */
    $('.add-product-box .radio-box li input[name="discount_option"]').on('click',function(){
        $('.add-product-box .discount-number').slideDown(500);
        var input_option_val = $(this).val();
        if (input_option_val == 0) {
            $('.discount-number .symbol.coin').hide();
            $('.discount-number .symbol.precentage').show();
        } else {
            $('.discount-number .symbol.precentage').hide();
            $('.discount-number .symbol.coin').show();
        }
    });
    /* -- ./Discount Type -- */

    /* -- Add Tags & Keywords -- */
    function seoInputsVal() {
        $('.adding-group ul').each(function(){
            $(this).siblings('input').val('');
            var input_val = '';
            $(this).children('li').each(function(){
                input_val = input_val + ', ' + $(this).children('.word').text();
            });
            $(this).siblings('input').val(input_val);
        });
    }
    seoInputsVal();
    $('.add-product-box .adding-group .add').on('click',function(){
        var input_val = $(this).siblings('input').val();
        $(this).siblings('input').val('');
        if ((!input_val.replace(/\s/g, '').length) || (input_val == '') ) {
            $(this).parent().siblings('.note').slideDown(500);
        } else {
            $(this).parent().siblings('.note').slideUp(500);
            $(this).parent().siblings('ul').append(`  
                <li>
                    <span class="word">`+ input_val +`</span> 
                    <span class="close-btn">&times;</span>
                </li>
            `);
            seoInputsVal();
        }
    });
    $('.add-product-box .adding-group ul li .close-btn').on('click',function(){
        $(this).parent('li').remove();
        seoInputsVal();
    });
    $('.radio-box li input').on('click',function(){
        var input_type = $(this).data('value'),
            input_val = $(this).val();
           
        if (input_type == 'product_type')
        {
            var product_form = $(this).data('name');
            if (input_val == 0) {
                $('.custom-form .product-form-overlay').removeClass('active');
                $('span.product_type').text(product_form);
                $('button.custom-save-btn').removeClass('not-select');

            } else {
                $('.custom-form .product-form-overlay').addClass('active');
                $('span.product_type').text(product_form);
                $('button.custom-save-btn').addClass('not-select');

            }
        } 
        else 
        {
            if (input_val == 0) {
                var temp = '.date-group.' + input_type;
                $(temp).each(function(){
                    $(this).addClass('disabled');
                });
                $('.date-picker').each(function(){
                    $(this).removeClass('open');
                    $(this).find('.result').children('span').html('');
                    $(this).find('.result').children('input').val('');
                });
            } else if (input_val == 1) {
                var temp = '.date-group.' + input_type;
                $(temp).each(function(){
                    $(this).removeClass('disabled');
                });
            }
        }

    });
    /* -- ./Add Tags & Keywords -- */

    /* -- Allowed Country To Shipping -- */
    $('.add-product-box .countries-list li').on('click',function(){
        var all_country = 0;
            selected_country = 0;
        $('.add-product-box .countries-list li').each(function(){
            if($(this).hasClass('checked')) {
                selected_country++;
            }
            all_country ++;
        });
        if (selected_country == 0) {
            $('.add-product-box .select-country-box .selected-box p').text('اختر دولاً');
        } else if(selected_country == all_country) {
            $('.add-product-box .select-country-box .selected-box p').text('تم تحديد جميع الدول');
        } else {
            var country_temp = 'تم اختيار ' + selected_country + ' دولة';
            $('.add-product-box .select-country-box .selected-box p').text(country_temp);
        }
    });
    $('.select-country .search .all-btn:not(.open)').on('click',function(){
        $('.add-product-box .select-country-box .selected-box p').text('تم تحديد جميع الدول');
    });
    /* -- ./Allowed Country To Shipping -- */

    /* -- Chosse Product Sections & Product Brands -- */
    var selected_product_sections = 0;
    var selected_product_brands = 0;

    $('.add-product-box .dropdown-box .sections-box ul').on('click',function(){
        if ( $(this).parent().data('value') == 'brands' )
        {
            $('.add-product-box .dropdown-box .sections-list[data-value="sections"]').removeClass('open');
            if( selected_product_brands <= 3 )
            {
                $(this).parent().siblings('.sections-list').toggleClass('open');
            }
        }
        else
        {
            $('.add-product-box .dropdown-box .sections-list[data-value="brands"]').removeClass('open');
            if( selected_product_sections <= 3 )
            {
                $(this).parent().siblings('.sections-list').toggleClass('open');
            }
        }
        
    });

    $('.add-product-box .dropdown-box .sections-list ul li').on('click',function(){
        if ( $(this).parents('.sections-list').data('value') == 'brands' )
        {
            if( ! $(this).hasClass('selected') )
            {
                selected_product_brands = selected_product_brands + 1 ;
                if ( selected_product_brands > 3 ) {
                    selected_product_brands = selected_product_brands - 1 ;
                    $(this).parents('.sections-list').toggleClass('open');
                    $(this).parents('.dropdown-box').find('p.note').toggleClass('disactive');
                }
                else {
                    var li_index = $(this).index();
                    $(this).addClass('selected');
                    $(this).parents('.dropdown-box').find('.sections-box ul li').eq(li_index).addClass('selected');
                }
            }
            else 
            {
                if ( selected_product_brands != 0 ) 
                {
                    var li_index = $(this).index();
                    selected_product_brands = selected_product_brands - 1;
                    $(this).removeClass('selected');
                    $(this).parents('.dropdown-box').find('.sections-box ul li').eq(li_index).removeClass('selected');
                    $(this).parents('.dropdown-box').find('p.note').addClass('disactive');
                }
            }
        }
        else 
        {
            if( ! $(this).hasClass('selected') )
            {
                selected_product_sections = selected_product_sections + 1 ;
                if ( selected_product_sections > 3 ) {
                    selected_product_sections = selected_product_sections - 1 ;
                    $(this).parents('.sections-list').toggleClass('open');
                    $(this).parents('.dropdown-box').find('p.note').toggleClass('disactive');
                }
                else {
                    var li_index = $(this).index();
                    $(this).addClass('selected');
                    $(this).parents('.dropdown-box').find('.sections-box ul li').eq(li_index).addClass('selected');
                }
            }
            else 
            {
                if ( selected_product_sections != 0 ) 
                {
                    var li_index = $(this).index();
                    selected_product_sections = selected_product_sections - 1;
                    $(this).removeClass('selected');
                    $(this).parents('.dropdown-box').find('.sections-box ul li').eq(li_index).removeClass('selected');
                    $(this).parents('.dropdown-box').find('p.note').addClass('disactive');
                }
            }
        }
      
    });

    $('.add-product-box .dropdown-box .sections-box ul li span.close-btn').on('click',function(){
        if ( $(this).parents('.sections-box').data('value') == 'brands' )
        {
            selected_product_brands = selected_product_brands - 1 ;
            var li_remove_index = $(this).parents('li').index();
            $(this).parents('li').removeClass('selected');
            $(this).parents('.dropdown-box').find('.sections-list ul li').eq(li_remove_index).removeClass('selected');
            $(this).parents('.dropdown-box').find('p.note').addClass('disactive');
        }
        else
        {
            selected_product_sections = selected_product_sections - 1 ;
            var li_remove_index = $(this).parents('li').index();
            $(this).parents('li').removeClass('selected');
            $(this).parents('.dropdown-box').find('.sections-list ul li').eq(li_remove_index).removeClass('selected');
            $(this).parents('.dropdown-box').find('p.note').addClass('disactive');
        }
    });
    $('.add-product-box .dropdown-box .sections-list .close-btn').on('click',function(){
        $(this).parent().removeClass('open');
    });
    /* -- ./Chosse Product Sections & Product Brands -- */

    /* -- Show Product Offer Block -- */
    $('.add-product-box .product-offers .inner-title .yes-no-btn input').on('click',function(){
        if($(this).is(':checked')) {
            $(this).parents('.product-offers').addClass('open');
            $(this).parents('.product-offers').children('.show-offer').slideDown(500);
        } else {
            $(this).parents('.product-offers').removeClass('open');
            $(this).parents('.product-offers').children('.show-offer').slideUp(500);
        }
    });
    /* -- ./Show Product Offer Block -- */

    /* -- Add New Product -- */
    $('.add-product-box .add-sub-product h3 span').on('click',function(){
        $(this).parent().slideUp(500);
        $(this).parents('.add-sub-product').find('.group').slideDown(500);
        $(this).parents('.add-sub-product').addClass('open');
    });
    $('.add-product-box .add-sub-product .custom-save-btn').on('click',function(){
        $(this).parents('.add-sub-product').children('h3').slideDown(500);
        $(this).parents('.add-sub-product').find('.group').slideUp(500);
        $(this).parents('.add-sub-product').removeClass('open');
    });
    $('.add-product-box .add-sub-product .close-btn').on('click',function(){
        $(this).parents('.add-sub-product').children('h3').slideDown(500);
        $(this).parents('.add-sub-product').find('.group').slideUp(500);
        $(this).parents('.add-sub-product').removeClass('open');
    });
    /* -- ./Add New Product -- */

    /* ========= ./Add Product ========== */

    /* -- change when select image --*/
    $('input[type="file"]').change(function () {
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) 
         {
            var reader = new FileReader();
            reader.onload = function (e) {
                var prev = $(input).parents('.col-lg-2').prev();
                var element = `
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <div class="img-containt">
                            <img src="`+e.target.result+`" class="img-fluid">
                            <a href="#" class="delete-img-btn">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                `;
                $(element).insertAfter(prev);

                //$(input).parents('.upload-file').find('img').attr('src',e.target.result);
            }
           reader.readAsDataURL(input.files[0]);
    
        }
        else
        {
            $(input).parents('.upload-file').find('img').attr('src',e.target.result);
        }
    });
    /* -- ./change when select image --*/


    /* ========= ./Add Product ========== */

    /* ========= Edit List Page ========== */
    $('.edit-list').sortable({
        handle: '.handle',
        cursor: 'move',
        containment: "parent",
    });
    $('.edit-list .ui-state-default .edit-list-btn').on('click',function(){
        $(this).parents('.ui-state-default').find('.edit-form').slideToggle(500);
        $(this).parents('.ui-state-default').toggleClass('open');
        $(this).parents('.ui-state-default').siblings().removeClass('open');
        $(this).parents('.ui-state-default').siblings().find('.edit-form').slideUp(500);
    });
    $('.edit-list .ui-state-default ul li .handle').on('mouseenter',function(){
        $('.edit-list .ui-state-default').each(function(){
            $(this).removeClass('open');
        });
        $('.edit-list .ui-state-default .edit-form').each(function(){
            $(this).slideUp(500);
        });
    });
    /* ========= ./Edit List Page ========== */

    /* -- Add Product Image --*/
    $('.photo-gallery .photo-gallery-footer .close-btn').on('click',function(){
        $('.photo-gallery .photo-gallery-containt .img-containt').each(function() {
            $(this).removeClass('select');
        });
        $('.photo-gallery .photo-gallery-footer span.save-img-btn').addClass('disactive');
        $('.overlay').toggleClass('active');
        $('.photo-gallery').toggleClass('active');
    });

    $('.add-product-box .product-img-box .upload-file ul li span.edit-btn').on('click',function(){
        var img_target = $(this).data('target');
        $('.photo-gallery .photo-gallery-footer .save-img-btn').attr('data-target',img_target);
        $('.overlay').toggleClass('active');
        $('.photo-gallery').toggleClass('active');
    });

    $('.photo-gallery .photo-gallery-containt .img-containt img').on('click',function(){
        $('.photo-gallery .photo-gallery-containt .img-containt').each(function() {
            $(this).removeClass('select');
        });
        $(this).parent().addClass('select');
        var img_path = $(this).attr('src');
        $('.photo-gallery .photo-gallery-footer span.save-img-btn').removeClass('disactive');
    });

    $('.photo-gallery .photo-gallery-footer .save-img-btn').on('click',function(){
        $('.photo-gallery .photo-gallery-containt .img-containt').each(function() {
            if( $(this).hasClass('select') ) 
            {
                var img = $(this).find('img').attr('src');
                var target = $('.photo-gallery .photo-gallery-footer .save-img-btn').attr('data-target');
                $('.overlay').toggleClass('active');
                $('.photo-gallery').toggleClass('active');
                $('.add-product-box .product-img-box .upload-file').find('img[data-target="'+target+'"]').attr('src',img);
            }
        });
    });
    /* ========= ./Add Product Image =========== */

    /* ---------- specification table ------------*/
    $('.add-new-specification').on('click',function(){
        var new_specification_row = `
            <tr>
                <td> <input type="text" autocomplete="off" name="specification_name[]"> </td>
                <td> <input type="text" autocomplete="off" name="specification_value[]"> </td>
                <td> <input type="text" autocomplete="off" name="specification_value[]"> </td>
                <td> <input type="text" autocomplete="off" name="specification_value[]"> </td>
                <td> <input type="text" autocomplete="off" name="specification_value[]"> </td>
                <td> <input type="text" autocomplete="off" name="specification_value[]"> </td>
                <td> <input type="text" autocomplete="off" name="specification_value[]"> </td>
                <td>
                    <a href="#" class="delete-specification" title="حذف">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            </tr>
        `;
        $('.add-product-box .adding-group table tbody').append(new_specification_row);
    });

    /* ========= ./specification table ========== */

    /* ---------- price table ------------*/
    var price_row_number = 1;
    $('.add-product-box .adding-group table.price-table tbody tr td .list-triger').on('click',function(){
        $('.add-product-box .adding-group table.price-table tbody tr td .list-triger').each(function(){
            $(this).parent().find('.list-container').removeClass('active');
        });
        $(this).parent().find('.list-container').toggleClass('active');
    });

    $('.add-product-box .adding-group table.price-table tbody tr td .list-container .specifications-list li').on('click',function(){
        var text_value = $(this).text();
        $(this).parents('td').find('span').text(text_value);
        $(this).parents('td').find('.list-triger').attr('value',text_value);
        $(this).parents('.list-container').toggleClass('active'); 
    });

    $('.add-new-price').on('click',function(){
        price_row_number = price_row_number + 1 ;
        var new_price_row = `
            <tr>
                <td> <span>`+price_row_number+`</span> </td>
                <td>
                    <span></span>
                    <input type="text" class="list-triger hidden-input">
                    <div class="list-container">
                        <ul class="specifications-list">
                            <li>الكل</li>
                            <li>أخضر</li>
                            <li>أحمر</li>
                            <li>ذهبي</li>
                            <li>أسود</li>
                            <li>أبيض</li>
                            <li>برتقالي</li>
                        </ul>
                    </div>
                </td>
                <td>
                    <span></span>
                    <input type="text" class="list-triger hidden-input">
                    <div class="list-container">
                        <ul class="specifications-list">
                            <li>الكل</li>
                            <li>512M</li>
                            <li>1G</li>
                            <li>2G</li>
                            <li>3G</li>
                            <li>4G</li>
                            <li>6G</li>
                        </ul>
                    </div>
                </td>
                <td>
                    <span></span>
                    <input type="text" class="list-triger hidden-input">
                    <div class="list-container">
                        <ul class="specifications-list">
                            <li>الكل</li>
                            <li>8G</li>
                            <li>16G</li>
                            <li>32G</li>
                            <li>64G</li>
                            <li>128G</li>
                            <li>256G</li>
                        </ul>
                    </div>
                </td>
                <td> <input type="text" autocomplete="off"> </td>
                <td>
                    <a class="delete-price" title="حذف">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            </tr>
        `;
        $('.add-product-box .adding-group table.price-table tbody').append(new_price_row);
    });
    /* ========= ./price table ========== */

    /* --------- Product Image Popup --------------*/
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    })

    /* ========= ./Product Image Popup =========== */


    /* -- Edit-Product Datatable --*/
    var datatable = $('#product-table').DataTable({
        "dom": '<"main-tool"<"toolbar">f> tlpi',
        responsive: true,   
        fixedColumns: false,
        autoWidth: false,
        "order": [],
        "iDisplayLength": 3,
        "pageLength": 25,
        "lengthMenu": [ 25, 100, 200, 300, 400 ],
        language: { 
            search: '',
            "paginate": 
                {
                  "previous": "السابق",
                  "next": "التالي",
                },
            emptyTable:  "لا يوجد معلومات لعرضها",
          },
        "oLanguage": {
          "sLengthMenu": "_MENU_",
          searchPlaceholder: "بحث",
          "sZeroRecords": "عذراّ لكن لا يوجد معلومات لعرضها",
          "sInfo": "يعرض _END_ من _TOTAL_ سجل",
          "sInfoEmpty": "0 من السجلات",
          "sInfoFiltered": "(تمت الفلترة من _MAX_ سجل)"
        },
        'columnDefs': [
            {
                'targets': 0,
                'searchable':false,
                'orderable':false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta){
                    return `
                    <div class="check-box">
                        <input type="checkbox" class="tablecheckbox" name="id[]" value="` + $('<div/>').text(data).html() + `">
                        <img src="assets/images/check.png" alt="">
                        <img src="assets/images/check-done.png" class="done" alt="">
                    </div>
                    `;
                    }
            },
            {
                bSortable: false,
                aTargets: [ -1 , 0 , 1 , 2 , 4]
            },
            {
                width:"80px",targets:1
            },
            {
                width:"20px",targets:6
            },
            {
                width:"10px",targets:0
            }
        ]
    });

    $("div.toolbar").html(`
        <div class="price-filter-section">
            <span>حسب السعر :</span>
            <div>
                <input type="number" min="1" class="filter-input price" id="min-price" placeholder="أدنى سعر">
                <input type="number" min="1" class="filter-input price" id="max-price" placeholder="أعلى سعر">
            </div>
        </div>

        <div class="quantaty-filter-section">
            <span>حسب الكمية :</span>
            <div>
                <input type="number" min="1" class="filter-input" id="min-quantity" placeholder="أقل كمية">
                <input type="number" min="1" class="filter-input" id="max-quantity" placeholder="أكثر كمية">
            </div>
        </div>
    `);

    $.fn.dataTable.ext.search.push(
        function( settings, data, dataIndex ) {
            var min_quantity = parseInt( $('#min-quantity').val(), 10 );
            var max_quantity = parseInt( $('#max-quantity').val(), 10 );
            var quantity = parseFloat( data[4] ) || 0; 
        
            if ( ( isNaN( min_quantity ) && isNaN( max_quantity ) ) ||
                    ( isNaN( min_quantity ) && quantity <= max_quantity ) ||
                    ( min_quantity <= quantity   && isNaN( max_quantity ) ) ||
                    ( min_quantity <= quantity   && quantity <= max_quantity ) )
            {
                return true;
            }
            return false;
        }
    );

    $('#min-quantity,#max-quantity').keyup(function(){
        datatable.draw();
    });
    
    $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min_price = parseInt( $('#min-price').val(), 10 );
        var max_price = parseInt( $('#max-price').val(), 10 );
        var price = parseFloat( data[3] ) || 0; 
 
        if ( ( isNaN( min_price ) && isNaN( max_price ) ) ||
             ( isNaN( min_price ) && price <= max_price ) ||
             ( min_price <= price   && isNaN( max_price ) ) ||
             ( min_price <= price   && price <= max_price ) )
        {
            return true;
        }
        return false;
    }
    );

    $('#min-price,#max-price').keyup(function(){
        datatable.draw();
    });
    /* ========= ./Edit-Product Datatable ========== */

});


