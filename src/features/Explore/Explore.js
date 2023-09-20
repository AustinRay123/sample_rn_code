import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import useStyles from './ExploreStyle';
import {dimens} from '../../constants/dimens';
import {commonStackIdentifier} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header/Header';
import {
  getArticles,
  getFeaturedArticles,
} from '../../commonSlices/explore.slice';
import {useSelector, useDispatch} from 'react-redux';
import ProgressIndicator from '../../components/ProgressIndicator';
import FastImage from 'react-native-fast-image';
import HorizontalCardList from './HorizontalCardList';

const Explore = ({props}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();
  const [articleList, setArticleList] = useState([]);
  const [featuredArticleList, setFeaturedArticleList] = useState([]);
  const articleSelector = useSelector(state => state.articlesReducer);
  const dispatch = useDispatch();

  const [current_page, setCurrent_page] = React.useState(1);
  const [last_page, setLast_page] = React.useState(1);
  const [per_page, setPer_page] = React.useState(10);
  const [total, setTotal] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(getArticles({per_page, current_page}));
    dispatch(
      getFeaturedArticles({per_page: 10, current_page: 1, is_featured: 1}),
    );
  }, []);
  useEffect(() => {
    if (getFeaturedArticles?.fulfilled) {
      let tempArray = [];
      articleSelector?.isFeaturedArticles?.data?.map((item, index) => {
        if (!featuredArticleList.some(e => e.id === item.id)) {
          tempArray.push(item);
        }
      });
      setFeaturedArticleList([...featuredArticleList, ...tempArray]);
    }
  }, [getFeaturedArticles, articleSelector]);

  useEffect(() => {
    if (getArticles?.fulfilled) {
      setCurrent_page(articleSelector?.articles?.pagination?.current_page);
      setLast_page(articleSelector?.articles?.pagination?.last_page);
      setPer_page(articleSelector?.articles?.pagination?.per_page);
      setTotal(articleSelector?.articles?.pagination?.total);
    }
    if (articleSelector?.articles?.data?.length > 0) {
      let tempArray = [];
      articleSelector?.articles?.data?.map((item, index) => {
        if (!articleList.some(e => e.id === item.id)) {
          tempArray.push(item);
        }
      });
      setArticleList([...articleList, ...tempArray]);
    }
  }, [getArticles, articleSelector]);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getArticles({per_page: 10, current_page: 1}));
    setRefreshing(false);
  };
  const OnLoadMore = () => {
    if (current_page < last_page) {
      dispatch(getArticles({per_page, current_page: current_page + 1}));
    }
  };

  const ArticleCard = item => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            //props.
            navigation.navigate(commonStackIdentifier.ArticleDetailsScreen, {
              articleData: item.item,
            });
          }}>
          <View
            style={[
              styles.articleCard,
              {
                borderTopRightRadius: item.index === 0 ? 10 : 0,
                borderTopLeftRadius: item.index === 0 ? 10 : 0,
                borderBottomRightRadius:
                  item.index === articleList.length - 1 ? 10 : 0,
                borderBottomLeftRadius:
                  item.index === articleList.length - 1 ? 10 : 0,
              },
            ]}>
            <View>
              <FastImage
                source={{uri: item.item.article_image}}
                style={styles.articleImage}
                resizeMode={'stretch'}
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text numberOfLines={2} style={styles.articleTitle}>
                {item.item.title}
              </Text>
              <View style={styles.articleSubTitle}>
                <Text style={styles.articleType}>{item.item.type}</Text>
                <View style={styles.articleLine} />
                <Text style={styles.articleAuthor}>
                  {'by ' + item.item.author}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{marginTop: Platform.OS == 'android' ? dimens.h6 : 0}}></View>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <Header title={'Explore'} customStyle={{paddingBottom: 10}} />
        <ScrollView style={{flex: 1}} bounces={false}>
          <View style={{flex: 1}}>
            <View style={{overflow: 'hidden', paddingBottom: 5}}>
              <View style={styles.header} />
            </View>
            <View style={styles.mainView}>
              {!!featuredArticleList?.length && (
                <View style={{flex: 0.5}}>
                  <HorizontalCardList data={featuredArticleList} />
                </View>
              )}
              <View
                style={{paddingHorizontal: dimens.w3, flex: 1, marginTop: 20}}>
                <View>
                  <Text style={styles.articleHeading}>
                    Recommended Articles
                  </Text>
                </View>
                <View style={styles.articleList}>
                  <FlatList
                    data={articleList}
                    keyExtractor={item => item.id}
                    style={{
                      marginTop: 20,
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    renderItem={item => ArticleCard(item)}
                    ItemSeparatorComponent={() => (
                      <View style={styles.articleSaperator} />
                    )}
                    ListFooterComponent={() => (
                      <View style={{height: dimens.h10}}>
                        {articleSelector?.loading && (
                          <ProgressIndicator
                            size="large"
                            color={colors.black}
                          />
                        )}
                      </View>
                    )}
                    onEndReached={
                      current_page < last_page ? () => OnLoadMore() : null
                    }
                    onEndReachedThreshold={0}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Explore;
